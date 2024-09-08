from django.shortcuts import render
from django.http import JsonResponse
import json
from backend.models import FinancialBureau
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def login(request):
    data = json.loads(request.body)
    email = data['email']
    password = data['password']
    try:
        financial = FinancialBureau.objects.get(email=email)
        if financial.password == password and financial.email == email:
            list_of_students = financial.list_of_students
            if list_of_students is None:
                list_of_students = []
            else:
                # Remove password from each student in the list
                for student in list_of_students:
                    if 'password' in student:
                        del student['password']
            data = {
                'list_of_students': list_of_students,
                'email': financial.email,
                'name': financial.name
            }
            return JsonResponse({'message': 'Login Successful', 'success': True, 'url': '/dashboard/financial', 'role': 'financial', 'data': data})
        else:
            return JsonResponse({'message': 'Invalid Credentials', 'success': False})
    except Exception as e:
        return JsonResponse({'message': f'Invalid Credentials', 'success': False}, status=500)
    
    
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
        return JsonResponse({'message': 'Financial Details', 'data': data, 'success': True,'role':'financial'})
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)