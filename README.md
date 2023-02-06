# OneGlass Forecast
MVP for OneGlass

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
