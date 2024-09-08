from django.shortcuts import render
from django.http import JsonResponse
import json
from backend.models import SAGBureau, Students
from django.views.decorators.csrf import csrf_exempt
from functions import analyze_noise, extract_exif
import requests
from io import BytesIO

# Create your views here.
from PIL import Image
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Configure Cloudinary
cloudinary.config(
  cloud_name='dm23rhuct',  # Replace with your Cloudinary cloud name
  api_key='972235453857764',        # Replace with your Cloudinary API key
  api_secret='ZssdWvtjhYTH3ULILEf_ZYVK5zc'   # Replace with your Cloudinary API secret
)


def download_and_return_url(image_url: str):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    img.save('temper.jpg')
    analyze_noise('temper.jpg')

    meta_res = extract_exif('temper.jpg')

    img = Image.open('detected_edit.jpg')

    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)

    response = cloudinary.uploader.upload(img_bytes, public_id=f'bosad_10th')
    file_url = response['secure_url']

    return meta_res, file_url

@csrf_exempt    
def login(request):
    data=json.loads(request.body)
    email=data['email']
    password=data['password']
    try:
        sag=SAGBureau.objects.get(email=email)
        if (sag.password==password and sag.email==email):
            list_of_students = Students.objects.filter(status__in=[2,3,4]).values('email', 'name','status','college','dob','phone','address','feedback','feedback_given','documents')
            list_of_students = list(list_of_students)
            data={
                'list_of_students':list_of_students,
                'email':sag.email,
                'name':sag.name
            }
            return JsonResponse({'message':'Login Successful','success':True,'url':'/dashboard/sag','role':'sag','data':data})
        else:
            return JsonResponse({'message':'Invalid Credentials','success':False})
    except Exception as e:
        return JsonResponse({'message':'Invalid Credentials','success':False},status=500)
    
    
    
@csrf_exempt
def update_sag(request):
    data = json.loads(request.body)
    email = data['email']
    try:
        sag = SAGBureau.objects.get(email=email)
        list_of_students = Students.objects.filter(status__in=[2, 3,4]).values('email', 'name', 'status', 'college', 'dob', 'phone', 'address', 'feedback', 'feedback_given', 'documents')
        list_of_students = list(list_of_students)
        data = {
            'list_of_students': list_of_students,
            'email': sag.email,
            'name': sag.name
        }
        print('data:', data)
        return JsonResponse({'message': 'SAG Details', 'data': data, 'success': True, 'role': 'sag'})
    except Exception as e:
        print('err')
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)




@csrf_exempt
def approve_doc(request):
    data = json.loads(request.body)
    print('data:', data)
    email = data['email']
    doc_name = data['documentName']
    try:
        student = Students.objects.get(email=email)
        docs = student.documents
        print('docs:', docs)

        if doc_name in docs:
            docs[doc_name]['status'] = 'approved'
            student.documents = docs
            student.status = 4

            # Check if all documents are approved
            all_approved = all(doc['status'] == 'approved' for doc in docs.values())
            if all_approved:
                student.status = 5

            student.save()
            return JsonResponse({'message': 'Document Approved', 'success': True})
        else:
            return JsonResponse({'message': 'Document not found', 'success': False}, status=404)
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)


@csrf_exempt
def detect_edit(request):
    data = json.loads(request.body)
    image_url = data['url']

    meta_res, url = download_and_return_url(image_url)
    
    return JsonResponse({'success': True, 'url': url, 'meta_result': meta_res})


@csrf_exempt
def add_feedback(request):
    data = json.loads(request.body)
    email = data['email']
    feedback = data['feedback']
    try:
        print('feedback:', feedback)
        student = Students.objects.get(email=email)
        student.feedback = feedback
        student.feedback_given = True
        student.save()
        return JsonResponse({'message': 'Feedback added', 'success': True})
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}', 'success': False}, status=500)