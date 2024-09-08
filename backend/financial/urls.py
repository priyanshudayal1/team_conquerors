from django.urls import path
from .views import *

urlpatterns = [
    path('login',login,name='login'),
    path('update_financial',update_financial,name='update_financial'),
    path('transaction_done',transaction_done,name='transaction_done'),
    path('disburse',disburse,name='disburse'),
]
