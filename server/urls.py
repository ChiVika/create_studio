from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
router.register('', views.PostDatas)
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path("cat/", include(router.urls))
]