# Foogle

![alt text](https://github.com/Yynx/RestaurantApp/blob/master/foogle.png "Foogle")
## About
An app that helps you find information about restaurants in your current location, or at a specified location.
After creating an account, you can save restaurants to your Favourites list!

## User stories
- As a user, I want to be able to enter a specific location to see suggested restaurants in that specific area
- As a user, I want to be able to use GeoLocation to see suggested restaurants in my current area
- As a user, I want a list of search results with information about each restaurant so I can find out more about each restaurant
- As a user, I want to be able to sort my results by distance, cost and rating so I can make a decision about which restaurant(s) I would like to go to
- As a user, I want to be able to sign up for an account so I can save restaurants to a Favourites list, which I can refer back to
- As a user, I want to be able to log in so I can access my Favourites list at a later date

## Technologies
- Git/GitHub
- JavaScript
- React
- Python
- Django
- Django REST framework
- PostgreSQL
- Webpack
- Babel
- Cypress
- HTML/CSS
- Bulma

APIs:
- Mapbox (to convert addresses, postcodes and city names to coordinates)
- Leaflet (to show markers on a map)
- Zomato (to get restaurant information)
- Unsplash (to get random images for the homepage)

## Getting started

### Connect to the database
Create a database called foogle_db in PostgreSQL.

In the root directory, create an .env file. Inside the .env file, write the following (replacing YOUR USERNAME with your PostgreSQL username, and YOUR PASSWORD with your PostgreSQL password):
```
USER=YOUR USERNAME
PASSWORD=YOUR PASSWORD
```

### Install project dependencies

In the root directory:
```
npm install
```

Build the React project:
```
npm run dev
```

Go into your project directory:
```
cd project
```

And install the following dependencies:
```
pip install -r requirements.txt
```
### Run the migrations
Creating new migrations based on the models:
```
python manage.py makemigrations
```
Apply the migrations:
```
python manage.py migrate
```

To view the app in your browser:
```
python manage.py runserver
```
Now, the app should be running on localhost:8000.

### Testing
Make sure you are in the RestaurantApp/project directory. Start the server:
```
python manage.py runserver
```

Open a new terminal. In the root directory, type this in the command line to start the integration tests:
```
npm run e2e
```

Type this in the command line to test the RESTful API:
```
python manage.py test api
```
## Extending our app
Ideas for future features to implement:
- Ability to Drag & Drop items to your Favourites list
- Ability to share your profile with other users
- Build recommendations based on your Favourites
## Credits
- Django tutorial (inc testing): [https://www.valentinog.com/blog/drf/](https://www.valentinog.com/blog/drf/)
- Database setup: [https://medium.com/agatha-codes/painless-postgresql-django-d4f03364989](https://medium.com/agatha-codes/painless-postgresql-django-d4f03364989)
- Creating models: [https://docs.djangoproject.com/en/3.0/topics/db/models/](https://docs.djangoproject.com/en/3.0/topics/db/models/)
- Django API: [https://www.youtube.com/watch?v=XMu0T6L2KRQ&list=PLEsfXFp6DpzTOcOVdZF-th7BS_GYGguAS](https://www.youtube.com/watch?v=XMu0T6L2KRQ&list=PLEsfXFp6DpzTOcOVdZF-th7BS_GYGguAS)
- Map API (Leaflet): [https://leafletjs.com/](https://leafletjs.com/)
