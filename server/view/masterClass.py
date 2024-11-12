from rest_framework.exceptions import AuthenticationFailed
from ..models import MasterClass
from ..serializers import MasterClassSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets


class PostsViews(APIView):
    def get(self, request, category_id):
        posts = MasterClass.objects.filter(сategories_id=category_id)
        serializer = MasterClassSerializer(posts, many=True)
        return Response(serializer.data)





