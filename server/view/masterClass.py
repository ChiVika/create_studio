import datetime
from rest_framework.exceptions import AuthenticationFailed
from ..models import *
from ..serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status


class PostsViews(APIView):
    def get(self, request, category_id):
        posts = MasterClass.objects.filter(сategories_id=category_id)
        serializer = MasterClassSerializer(posts, many=True)
        return Response(serializer.data)
    
class SubViewsId(APIView):
    def get(self, request, sub_id):
        sub = Subsidiary.objects.filter(id=sub_id)
        serializer = SubSerializer(sub, many=True)
        return Response(serializer.data)
class TeacherViewId(APIView):
    def get(self, request, teacher_id):
        teacher = Teachers.objects.filter(id=teacher_id)
        serializer = TeacherSerializer(teacher, many=True)
        return Response(serializer.data)

class TeariffsViewsId(APIView):
    def get(self, request, mc_id):
        tariff = Tariffs.objects.filter(masterClass_id=mc_id)
        serializer = TariffsSerializer(tariff, many=True)
        return Response(serializer.data)



class RecordView(APIView):
    def post(self, request, mc_id, user_id):
        if Records.objects.filter(masterClass_id=mc_id, user_id=user_id).exists():
            return Response({"detail: Вы уже записаны на этот мастер-класс"}, status=status.HTTP_400_BAD_REQUEST)
        unique_number = Records.generate_unique_number()
        record = Records.objects.create(
            masterClass_id=mc_id,
            user_id=user_id,
            status=Status.BOOKING,
            date=datetime.date.today(),
            number=unique_number
        )
        serializer = RecordsSerializer(record)
        return Response(serializer.data)


    

