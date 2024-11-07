from datetime import datetime
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse

from ..models import Users
from ..serializers import UserSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime



class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class LoginView(APIView):
    def post(self, request):
        email =  request.data['email']
        password = request.data['password']

        user = Users.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Пользователь не найден')
        if not user.check_password(password):
            raise AuthenticationFailed('Некорректный пароль')
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, samesite='None', secure=True)

        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        print('токен: ',token)

        if not token:
            raise AuthenticationFailed('Не аунтифицирован!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Пользователь не найден')
        
        user = Users.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': "sucsess"
        }
        return response