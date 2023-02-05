from django.db import connection

def next_14_days_sales():
    "Return all rows"

    query = """
    SELECT location, date, forecasted_sales_quantity sales
    FROM oneglass.forecasts f
    WHERE date BETWEEN CURRENT_DATE AND CURRENT_DATE + interval '13 days'
    ORDER BY location, date
    """

    with connection.cursor() as cursor:
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
    return [
        dict(zip(columns, row))
        for row in rows
    ]


def get_three_days_total():
    "Return the running total every 3 days"

    query = """
    WITH cth AS (
        SELECT date,
           location,
           SUM(f.forecasted_sales_quantity) OVER (
               PARTITION BY location
               ORDER BY date
               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) running_total,
           COUNT(f.forecasted_sales_quantity) OVER (
               PARTITION BY location
               ORDER BY date
               ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) cou
        FROM oneglass.forecasts f
        ORDER BY location, date
    )
    SELECT location, cou, running_total, MIN(date) AS start_date, MIN(date) + interval '1 day' AS end_date
    FROM cth
    GROUP BY location, running_total, cou;
    """


    # WHERE running_total < 1000 AND cou = 3

    with connection.cursor() as cursor:
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
    return [
        dict(zip(columns, row))
        for row in rows
    ]
