from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.authtoken.models import Token

import json

class UserTests(APITestCase):
    # Test to see if we can register a new user
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
    
    def test_login_user(self):
        # register user
        url = reverse('user-list')
        data = {'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # login user
        url = reverse('login-user')
        data = {'username': 'moscowradish', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(json.loads(response.content)['username'], 'moscowradish')
        self.assertIn('token', json.loads(response.content))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_no_email(self):
        # register user
        url = reverse('user-list')
        data = {'username': 'moscowradish', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content)['email'], ['This field is required.'])

    def test_login_user_no_email_no_username(self):
        # register user
        url = reverse('user-list')
        data = {'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # login user
        url = reverse('login-user')
        data = {'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content)['non_field_errors'], ["Either a username or an email is required to login"])

    def test_login_user_incorrect_username(self):
        # login user
        url = reverse('login-user')
        data = {'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content)['non_field_errors'], ["This username or email is not valid"])

    def test_login_user_incorrect_password(self):
        # register user
        url = reverse('user-list')
        data = {'username': 'moscowradish', 'email': 'radish@mail.com', 'password': 'radi77shy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # login user
        url = reverse('login-user')
        data = {'username': 'moscowradish', 'password': 'r7shghvy'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content)['non_field_errors'], ["The password you entered was incorrect. Please try again!"])
    
