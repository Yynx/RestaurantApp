# Foogle

![alt text](https://github.com/Yynx/RestaurantApp/blob/master/foogle.png "Foogle")

## Getting started

### Connect to the database

Create a database called foogle_db in PostgreSQL.

Create a .env file in the same directory as settings.py. Inside the .env file, write:

USER=YOUR USERNAME

PASSWORD=YOUR PASSWORD

### Install project dependencies

In the root folder:

```npm install```

Build the React project:

```npm run dev```

Go into your project folder: ``` cd project ```

And install the following depencies:

``` pip install psycopg2 ```

``` pip install dotenv ```

``` pip install python-dotenv ```

``` pip install Django ```

```pip install djangorestframework```

```pip install djangorestframework-jwt```

## Testing

in the root directory type following in the command line to start the integration tests:

```npm run e2e```

type this in the command line to test the RESTful API:

```python project/manage.py test api```

Start the server:

```python manage.py runserver```
