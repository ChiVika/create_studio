from django.db.models import fields
from rest_framework import serializers
from .models import *

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

class MasterClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterClass
        fields = "__all__"

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsidiary
        fields = "__all__"

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = "__all__"

class TariffsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariffs
        fields = "__all__"


class RecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = "__all__"