from rest_framework.exceptions import AuthenticationFailed
from ..models import *
from ..serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt, datetime
from rest_framework import status
from django.utils import timezone

class TeachersView(APIView):
    def get(self, request):
        teachers = Teachers.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)
    
class TeacherScheduleView(APIView):
    def get(self, request, teacher_id):
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end_of_month = start_of_month.replace(month=start_of_month.month + 1) - timezone.timedelta(microseconds=1)

        master_classes = MasterClass.objects.filter(
            teacher_id=teacher_id,
            date__range=(start_of_month, end_of_month)
        ).values('title','date', "time")

        return Response(master_classes)