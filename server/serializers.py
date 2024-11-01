from django.db.models import fields
from rest_framework import serializers
from .models import Сategories, Users
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

    # def create(self, validated_data):
    #     # password = validated_data.pop('password', None)
    #     # instance = self.Meta.model(**validated_data)
    #     # if password is not None:
    #     #     instance.set_password(password)
    #     # instance.save()
    #     # return instance
        def create(self, validated_data):
            user = Users.create_user(**validated_data)
            return user

    
