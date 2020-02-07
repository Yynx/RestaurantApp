from django.db import models
from django.contrib.auth.models import User

class Favourites(models.Model):
    res_id = models.CharField(max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
