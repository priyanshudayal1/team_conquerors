from django.urls import path
from .views import *

urlpatterns = [
    path('login',login,name='login'),
    path('update_sag',update_sag,name='update_sag'),   
    path('approve_doc',approve_doc,name='approve_doc'),
    path('detect_edit',detect_edit,name='detect_edit'),
    path('add_feedback',add_feedback,name='add_feedback'),
]
