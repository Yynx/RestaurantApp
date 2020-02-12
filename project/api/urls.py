from django.urls import path, re_path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
# .as_view() required for class based views
urlpatterns = [
    path('token', obtain_jwt_token),
    path('refresh', refresh_jwt_token),
    path('users', views.UserList.as_view(), name='user-list'),
    path('favourites', views.FavouritesList.as_view(), name='favourites-list'),
    path('users/login', views.UserLogin.as_view(), name='login-user'),
    path('favourites/<int:pk>/', views.FavouritesDelete.as_view(), name='del-favourites')
]
