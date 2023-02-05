import requests
import pandas as pd

api_key = '3WWEVYKLNRDJ4DHHK7ASL5XFF'


def get_temperature(location, date_range='next13days', temp_elements='datetime,name,temp'):
    params = dict(elements=temp_elements,
                  key=api_key, contentType='json', include='days', unitGroup='metric')
    request_url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{date_range}"
    resp = requests.get(request_url, params)
    json_response = resp.json()
    days_data = json_response['days']
    return days_data


def next_three_days(date):
    da = pd.date_range(start=date, periods=3).strftime("%Y-%m-%d").tolist()
    return da


def temp_for_day(date, date_temp_dict):
    return date_temp_dict.get(date, 0)


def filter_by_conditions(item):
    running_total = item.get('running_total', 0)
    running_count = item.get('running_count', 0)
    all_below_five = item.get('all_below_five', False)
    return (running_total < 1000 and running_count == 3) or (all_below_five == True and running_total <= 1500)
