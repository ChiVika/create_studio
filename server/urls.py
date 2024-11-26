from django.urls import include, path

from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views
from .view.authentication import Register, LoginView, UserView, LogoutView
from .view.profile import *
from .view.reports import *
from .view.masterClass import *
router = DefaultRouter()
router.register('', views.PostDatas)


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path("cat/", include(router.urls)),

    path("register/", Register.as_view(), name='register'),
    path("login/", LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', BIOView.as_view(), name='profile'),

    path('posts/', views.CatViews.as_view(), name='posts'),
    path('posts/<int:ids>/', views.CatViewsId.as_view(), name='posts_id'),

    path("masterClass/<int:category_id>/", PostsViews.as_view(), name="mc"),
    path("subsidary/<int:sub_id>/", SubViewsId.as_view(), name="sub"),

    path("teacher/<int:teacher_id>/", TeacherViewId.as_view(), name="teacher"),
    path("teachersAll/", TeachersView.as_view(), name="all_teachers"),

    path("tariff/<int:mc_id>/", TeariffsViewsId.as_view(), name="terrifs"),
    path("record/<int:mc_id>/<int:user_id>/", RecordView.as_view(), name="record"),
    path("recordsall/", RecordViewsall.as_view(), name="records_all"),
    path("McRecord/<int:record_id>/", MConRecord.as_view(), name="get_mc_by_id"),

    path("userWorks/", MyWorks.as_view(), name="user_works"),
    path('teacher-schedule/<int:teacher_id>/', TeacherScheduleView.as_view(), name='teacher-schedule'),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)