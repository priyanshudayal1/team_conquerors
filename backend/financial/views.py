from django.shortcuts import render
from django.http import JsonResponse
import json
from backend.models import FinancialBureau
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def login(request):
    data=json.loads(request.body)
    email=data['email']
    password=data['password']
    try:
        financial=FinancialBureau.objects.get(email=email)
        if (financial.password==password and financial.email==email):
            data={
                'list_of_students':financial.list_of_students,
                'email':financial.email,
            }
            return JsonResponse({'message':'Login Successful','success':True,'url':'/financial/dashboard','role':'financial','data':data})
        else:
            return JsonResponse({'message':'Login Failed','success':False})
    except Exception as e:
        return JsonResponse({'message':f'An error occurred: {str(e)}','success':False},status=500)
    
    
@csrf_exempt   
def update_financial(request):
    data = json.loads(request.body)
    email = data['email']
    try:
        financial = FinancialBureau.objects.get(email=email)
        data = {
            'list_of_students': financial.list_of_students,
            'email': financial.email
        }
        return JsonResponse({'message': 'Financial Details', 'data': data, 'success': True})
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)