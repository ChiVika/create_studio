from rest_framework.exceptions import AuthenticationFailed
from ..models import Users, Profile
from ..serializers import UserSerializer, ProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt, datetime
from rest_framework import status

class BIOView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Не аутентифицирован!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Токен истек!')
        user = Users.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('Пользователь не найден')
        
        profile, created = Profile.objects.update_or_create(
            user=user,
            # defaults={
            #     'lastname': request.data.get('lastname'),
            #     'name': request.data.get('name'),
            #     'phone': request.data.get('phone'),
            #     'photo': request.data.get('photo')
            # }
        )
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def get(self,request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Не аутентифицирован!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Токен истек!')

        user = Users.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('Пользователь не найден')
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)