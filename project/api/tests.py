from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.test import TestCase
import json

# Test to see if we can register a new user
class UserTests(APITestCase):
    def test_create_new_user(self):
        url = reverse('user-list')
        data = {'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.content), {'id': 1, 'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'})
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'moscowradish')
        self.assertEqual(User.objects.get().email, 'radish@mail.com')
        self.assertEqual(User.objects.get().password, 'radi77shy')

