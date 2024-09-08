from django.urls import path
from .views import *

urlpatterns = [
    path('register',register,name='register'),
    path('login',login,name='login'),
    path('update_user',update_user,name='update_user'),
    path('verify_user',verify_user,name='verify_user'),
]
