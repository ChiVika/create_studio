from django.db.models import fields
from rest_framework import serializers
from .models import Сategories, Users, Profile
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.password_validation import validate_password
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Сategories
        fields = "__all__"
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        extra_kwards = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            user = Users.create_user(**validated_data)
            return user

    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"