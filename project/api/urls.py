from django.urls import path, re_path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

# .as_view() required for class based views
urlpatterns = [
    path('token', obtain_jwt_token),
    path('users', views.UserList.as_view(), name='user-list'),
    path('users/login', views.UserLogin.as_view(), name='login-user'),
]
