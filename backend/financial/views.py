from django.shortcuts import render
from django.http import JsonResponse
import json
from backend.models import FinancialBureau, Students
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
            list_of_students = Students.objects.filter(status=4).values('name', 'account_number','ifsc','college','phone','address')
            list_of_students = list(list_of_students)
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

        list_of_students = Students.objects.filter(status=4).values('name', 'account_number','ifsc','college','phone','address')
        list_of_students = list(list_of_students)
        data = {
            'list_of_students': list_of_students,
            'email': financial.email,
            'name': financial.name
        }

        return JsonResponse({'message': 'Financial Details', 'data': data, 'success': True,'role':'financial'})
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)
    

@csrf_exempt
def transaction_done(request):
    data = json.loads(request)
    student_email = data['email']

    student = Students.objects.get(email=student_email)
    student.status = 7
    student.save()