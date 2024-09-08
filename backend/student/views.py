from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from backend.models import Students
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def register(request):
    try:
        data = json.loads(request.body)
        name = data["name"]
        email = data["email"]
        college = data["college"]
        password = data["password"]
        account_number = data["account_number"]
        ifsc = data["ifsc"]
        father_name = data["father_name"]
        income = data["income"]
        class10_percent = data["class10_percent"]
        class12_percent = data["class12_percent"]
        phone = data["phone"]
        password = make_password(password)
        student = Students(
            name=name,
            email=email,
            college=college,
            password=password,
            account_number=account_number,
            ifsc=ifsc,
            father_name=father_name,
            income=income,
            class10_percent=class10_percent,
            class12_percent=class12_percent,
            phone=phone,
        )
        student.save()
        return JsonResponse(
            {"message": "Student Registered Successfully", "success": True}
        )
    except KeyError as e:
        return JsonResponse(
            {"message": f"Missing field: {str(e)}", "success": False}, status=400
        )
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON", "success": False}, status=400)
    except Exception as e:
        return JsonResponse(
            {"message": f"An error occurred: {str(e)}", "success": False}, status=500
        )


@csrf_exempt
def login(request):
    data = json.loads(request.body)
    email = data["email"]
    password = data["password"]
    try:
        student = Students.objects.get(email=email)
        check_pass = check_password(password, student.password)
        if check_pass:
            documents = student.documents
            if documents is None:
                documents = []

            data = {
                "name": student.name,
                "email": student.email,
                "college": student.college,
                "account_number": student.account_number,
                "ifsc": student.ifsc,
                "father_name": student.father_name,
                "income": student.income,
                "class10_percent": student.class10_percent,
                "class12_percent": student.class12_percent,
                "phone": student.phone,
                "status": student.status,
                "documents": documents,
            }
            return JsonResponse(
                {
                    "message": "Login Successful",
                    "success": True,
                    "data": data,
                    "url": "/dashboard/student",
                    "role": "student",
                }
            )
        else:
            return JsonResponse({"message": "Invalid Credentials", "success": False})
    except:
        return JsonResponse({"message": "Invalid Credentials", "success": False})


@csrf_exempt
def update_user(request):
    data = json.loads(request.body)
    email = data["email"]
    try:
        student = Students.objects.get(email=email)
        documents = student.documents
        if documents is None:
            documents = []
        user_data = {
            "name": student.name,
            "email": student.email,
            "college": student.college,
            "account_number": student.account_number,
            "ifsc": student.ifsc,
            "father_name": student.father_name,
            "income": student.income,
            "class10_percent": student.class10_percent,
            "class12_percent": student.class12_percent,
            "phone": student.phone,
            "status": student.status,
            "documents": documents,
        }
        return JsonResponse(
            {
                "message": "User Updated Successfully",
                "success": True,
                "data": user_data,
                "role": "student",
            }
        )
    except:
        return JsonResponse({"message": "User not found", "success": False})

@csrf_exempt
def verify_user(request):
    data = json.loads(request.body)
    print('data:',data)
    email = data["email"]
    aadhar_number = data["aadhar"]

    aadhar_numbers = {
        "121212121212": {
            "name": "Anubhav Choubey",
            "p_number": "9131853043",
            "aadhar_number": "121212121212",
            "address": "Jabalpur 482005, Madhya Pradesh",
            "dob": "25-03-2005",
        },
        "212121212121": {
            "name": "Rishita Parashar",
            "p_number": "9090909090",
            "aadhar_number": "212121212121",
            "address": "Jabalpur 482001, Madhya Pradesh",
            "dob": "21-11-2004",
        },
    }

    if aadhar_number in aadhar_numbers.keys():
        student = Students.objects.get(email=email)
        student.status = 1
        student.dob = aadhar_numbers[aadhar_number]['dob']
        student.address = aadhar_numbers[aadhar_number]['address']
        student.save()
        return JsonResponse({'success':True})
    return JsonResponse({'success':False})


