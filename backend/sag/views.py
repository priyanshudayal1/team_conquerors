from django.shortcuts import render
from django.http import JsonResponse
import json
from backend.models import SAGBureau
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt    
def login(request):
    data=json.loads(request.body)
    email=data['email']
    password=data['password']
    try:
        sag=SAGBureau.objects.get(email=email)
        if (sag.password==password and sag.email==email):
            list_of_students=sag.list_of_students
            if list_of_students is None:
                list_of_students=[]
            data={
                'list_of_students':list_of_students,
                'email':sag.email,
                'name':sag.name
            }
            return JsonResponse({'message':'Login Successful','success':True,'url':'/dashboard/sag','role':'sag','data':data})
        else:
            return JsonResponse({'message':'Invalid Credentials','success':False})
    except Exception as e:
        return JsonResponse({'message':f'An error occurred: {str(e)}','success':False},status=500)
    
    
    
@csrf_exempt
def update_sag(request):
    data = json.loads(request.body)
    email = data['email']
    try:
        sag = SAGBureau.objects.get(email=email)
        data = {
            'list_of_students': sag.list_of_students,
            'email': sag.email
        }
        return JsonResponse({'message': 'SAG Details', 'data': data, 'success': True})
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)
    