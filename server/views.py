# from django.shortcuts import render
# from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets, permissions
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Сategories
from rest_framework.views import APIView
from .serializers import CategoriesSerializer
@api_view(['GET'])
def getRoutes(req):
    
    return Response("Our API")



class PostDatas(viewsets.ModelViewSet):

    queryset = Сategories.objects.all()
    serializer_class = CategoriesSerializer

class CatViews(APIView):
    def get(self, request):
        datas = Сategories.objects.all()
        serializers = CategoriesSerializer(datas, many=True)
        return Response(serializers.data)
    
    def post(self,request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
class CatViewsId(APIView):
    def get(self, request, ids):
        try:
            data = Сategories.objects.get(id=ids)
            
        except Сategories.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        serializers = CategoriesSerializer(data)
        print(serializers.data)
        return Response(serializers.data)
    def put(self,request, ids):
        try:
            data = Сategories.objects.get(id=ids)
        except Сategories.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        serializers = CategoriesSerializer(data=request.data, instance=data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=400)
    def delete(self, request, ids):
        try:
            data = Сategories.objects.get(id=ids)
        except Сategories.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        data.delete()
        return Response(status=200)