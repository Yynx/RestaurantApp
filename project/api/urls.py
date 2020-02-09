from django.urls import path, re_path
from . import views

# .as_view() required for class based views
urlpatterns = [
    path('users', views.UserList.as_view(), name='user-list'),
]
