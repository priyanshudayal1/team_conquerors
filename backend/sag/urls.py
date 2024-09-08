from django.urls import path
from .views import *

urlpatterns = [
    path('login',login,name='login'),
    path('update_sag',update_sag,name='update_sag'),   
]
