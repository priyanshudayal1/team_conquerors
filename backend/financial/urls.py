from django.urls import path
from .views import *

urlpatterns = [
    path('login',login,name='login'),
    path('update_financial',update_financial,name='update_financial'),
]
