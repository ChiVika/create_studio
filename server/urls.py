from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
from .view.authentication import Register, LoginView, UserView, LogoutView

router = DefaultRouter()
router.register('', views.PostDatas)



urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path("cat/", include(router.urls)),
    path("register/", Register.as_view(), name='register'),
    path("login/", LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout')

]