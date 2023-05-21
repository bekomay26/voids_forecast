# OneGlass Forecast
MVP for OneGlass

## List of requirements
Build a web application that allows the users (procurement manager
and managing director) to do the following:
- As a procurement manager of ONEGLASS.io, I want to see the forecasted sales for
the next two weeks for each location, so that I can make sure enough sunglasses are
on stock in each location.
- As a procurement manager of ONEGLASS.io, I want to be able compare the
forecasted weather data for the next two weeks with VOIDS sales quantity forecast
for each location, so that I can make manual adjustments in the case of unexpected
weather changes.
- As a procurement manager of ONEGLASS.io, I want to be able to switch between
locations with an interactive button that changes the data visualized in the UI, so
that I can focus on one store at a time.
- As a managing director of ONEGLASS.io, I want to have the ability to press a button
that will generate a list of alerts on which future days I need to close our store due to
bad weather conditions, so that we decrease our fixed costs on unprofitable days.


**Conditions that must take place for the managing director to close the store:**
- He can only close the store for 3 days in a row.
- He can close it when VOIDS forecast is indicating total sales quantities of less than
one thousand units in three subsequent days.
- He can close it when temperatures are below 5 degrees Celsius for three
subsequent days, unless VOIDS forecast is telling me the total sales quantities sold in
those three days are above one thousand five hundred units.

## Start project

In the project directory, you can:

### Using docker
- Run `docker compose up`
- Open `http://localhost:3000/` in your browser

### Without docker

**Run API**
- `cd backend`
- `pip install -r requirements.txt`
- `python manage.py runserver`

**Run client**
- `cd frontend`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000/` in your browser



### API Endpoints

- Retrieve sales and temp data for 2 weeks (14 days) - GET http://localhost:8000/api/procurement
- Retrieve all date ranges a director can close the shop - GET http://localhost:8000/api/director
