from rest_framework import serializers
from api.models import Favourites
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Q
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER

class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(label='Email Address', required=True, allow_blank=False)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        user_email = User.objects.filter(email=value)
        if user_email.exists():
            raise ValidationError("This email has already been registered")
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(username = username, email = email)
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(label='ID', read_only=True)
    username = serializers.CharField(allow_blank=True, required=False)
    email = serializers.EmailField(label='Email Address', required=False, allow_blank=True)
    token = serializers.CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'token')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        user_obj = None
        email = data.get('email', None)
        username = data.get('username', None)
        password = data['password']
        
        if not email and not username:
            raise ValidationError('Either a username or an email is required to login')

        user = User.objects.filter(
            Q(email=email) | 
            Q(username=username)
        ).distinct()
         
        user = user.exclude(email__isnull=True).exclude(email__exact='')

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username or email is not valid')

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError('The password you entered was incorrect. Please try again!')
            id = User.objects.get(username=username)
            data['id'] = id
            payload = jwt_payload_handler(user_obj)
            data['token'] = jwt_encode_handler(payload)
            
        return data