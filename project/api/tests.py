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
        self.assertEqual(json.loads(response.content), { 'username': 'moscowradish', 'email': 'radish@mail.com'})
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'moscowradish')
        self.assertEqual(User.objects.get().email, 'radish@mail.com')
    
    def test_create_user_email(self):
        url = reverse('user-list')
        data1 = {'username': 'applecar', 'email': 'radish@mail.com', 'password': 'sand34see'}
        data2 = {'username': 'newyorkpear', 'email': 'radish@mail.com', 'password': 'sand34see'}
        self.client.post(url, data1, format='json')
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), { 'email': ["This email has already been registered"]})
        self.assertEqual(User.objects.count(), 1)
  