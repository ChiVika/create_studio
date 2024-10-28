# from django.shortcuts import render
# from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets, permissions
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Сategories
from .serializers import CategoriesSerializer
@api_view(['GET'])
def getRoutes(req):
    
    return Response("Our API")



class PostDatas(viewsets.ModelViewSet):

    queryset = Сategories.objects.all()
    serializer_class = CategoriesSerializer