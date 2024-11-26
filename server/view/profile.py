from rest_framework.exceptions import AuthenticationFailed
from ..models import *
from ..serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt, datetime
from rest_framework import status

class BIOView(APIView):
    def post(self, request):
        # Получение токена из cookies
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

        profile, created = Profile.objects.update_or_create(user=user)

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
    
class RecordViewsall(APIView):
    def get(self, request):
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
        
        records = Records.objects.filter(user=user)
        serializer = RecordsSerializer(records, many=True)
        return Response(serializer.data)
    
class MConRecord(APIView):
    def get(self, request, record_id):
        record = Records.objects.get(id=record_id)
        master_class = record.masterClass
        serializer = MasterClassSerializer(master_class)
        return Response(serializer.data)


class MyWorks(APIView):
    def get(self, request):
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
        works = UserWorks.objects.filter(user=user)
        serializer = UserWorksSerializer(works, many=True)
        return Response(serializer.data)
    

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
        
        works, created = UserWorks.objects.update_or_create(user=user)
        serializer = UserWorksSerializer(works, data=request.data)
        
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data)

        return Response(serializer.errors)