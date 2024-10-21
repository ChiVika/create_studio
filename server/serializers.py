from django.db.models import fields
from rest_framework import serializers
from .models import Сategories


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Сategories
        fields = "__all__"