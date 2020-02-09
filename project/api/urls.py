from django.urls import path, re_path
from . import views

urlpatterns = [
    path('users', views.UserList.as_view(), name='user-list'),
]
