from django.http import HttpResponse, JsonResponse
from .helper import get_temperature, filter_by_conditions, temp_for_day, next_three_days
from .queries import get_three_days_total, next_14_days_sales
from .models import Forecast
import pandas as pd
from datetime import date

def fourteen_days(request):
    temp_elements = 'datetime,name,tempmax,tempmin,temp,dew,humidity,snow'
    loc_data = next_14_days_sales()

    df = pd.DataFrame(loc_data)
    sales_df = df.groupby('location')
    grouped_result = {}
    for location, frame in sales_df:
        frame['date_only'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        newlist = []
        weather_data = get_temperature(location, 'next13days', temp_elements)
        for n in weather_data:
            oj = {'date': n['datetime'], 'temp': n['temp']}
            location_records = frame[frame['date_only'] == n['datetime']].to_dict('records')
            if location_records:
                location_obj = location_records[0]
                oj['sales'] = location_obj['sales']
            newlist.append(oj)
        grouped_result[location] = newlist
    return JsonResponse(grouped_result, safe=False)


def some_view(request):
    loc_data = get_three_days_total()

    main_start_date = date.today().strftime('%Y-%m-%d')
    max_date_in_loc_data = max(loc_data, key=lambda x: x['start_date'])['start_date'].strftime('%Y-%m-%d')
    weather_api_date_range = f"{main_start_date}/{max_date_in_loc_data}"
    db = pd.DataFrame(loc_data)
    running_total_df = db.groupby('location')
    grouped_result = {}


    for location, frame in running_total_df:

        frame['date_only'] = pd.to_datetime(db['start_date']).dt.strftime('%Y-%m-%d')
        newlist = []
        weather_data = get_temperature(location, weather_api_date_range)

        # dict with date keys and temp values i.e {'2012-4-11' : -4.3}
        date_temp_dict = dict((x['datetime'], x['temp']) for x in weather_data)
        for n in weather_data:
            new_obj = {'start_date': n['datetime']}
            date_range = next_three_days(n['datetime'])
            new_obj['date_range'] = date_range
            temp_range = list(map(lambda x: temp_for_day(x, date_temp_dict), date_range))
            new_obj['temp_range'] = temp_range
            all_below_five = all(ele < 5 for ele in temp_range)
            new_obj['all_below_five'] = all_below_five
            location_records = frame[frame['date_only'] == n['datetime']].to_dict('records')
            if location_records:
                location_obj = location_records[0]
                new_obj['running_total'] = location_obj['running_total']
                new_obj['running_count'] = location_obj['cou']
            newlist.append(new_obj)
        filtered_list = list(filter(filter_by_conditions, newlist))
        grouped_result[location] = filtered_list
    return JsonResponse(grouped_result)
