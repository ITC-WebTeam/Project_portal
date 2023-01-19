from datetime import datetime
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from django.conf import settings
import pandas as pd
import numpy as np
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
import base64
from django.db.models import Q
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

from .models import *

def handle_uploaded_file(f):  
    with open('project/media/'+f.name, 'wb+') as destination:  
        for chunk in f.chunks():  
            destination.write(chunk) 

@permission_classes((AllowAny,))
@csrf_exempt
def posts(request):
    headers = { "Authorization": "Basic "
                + base64.b64encode(
                    f"0eo7GWH5u9yizZz3ZjzMreaDhLJJfAno2PvkhG34:awgwsPo0UIQavs9wStQSqG4cemuOtK0KTBq5VwiFBU1rULftkMIiyTXRWMN1LakoMYNAFzHauR0m0VQr8K2I5gVCYaJE4TwVcZA3Om9l7aTDoj27FQqFdNQ4euJOqlh2".encode("utf-8")
                ).decode("utf-8"),
                "Content-Type": "application/x-www-form-urlencoded",
    }
    x=base64.b64encode(
                    f"0eo7GWH5u9yizZz3ZjzMreaDhLJJfAno2PvkhG34:awgwsPo0UIQavs9wStQSqG4cemuOtK0KTBq5VwiFBU1rULftkMIiyTXRWMN1LakoMYNAFzHauR0m0VQr8K2I5gVCYaJE4TwVcZA3Om9l7aTDoj27FQqFdNQ4euJOqlh2".encode("utf-8")
                ).decode("utf-8")
    data = JSONParser().parse(request)
    r = requests.post('https://gymkhana.iitb.ac.in/profiles/oauth/token/', data='code='+data.get('code')+'&grant_type=authorization_code', headers=headers) 
    b = requests.get('https://gymkhana.iitb.ac.in/profiles/user/api/user/?fields=first_name,last_name,profile_picture,roll_number,email', headers={'Authorization':'Bearer '+r.json()['access_token']})
    data=b.json()
    if data['last_name'] is None:
        data['last_name']=''
    if data['profile_picture'] is None:
        data['profile_picture']=''
    try:
        user = User.objects.get(username = data['roll_number'])
    except:
        user = User.objects.create_user(username=data['roll_number'], email=data['email'], password='project')
    token,created = Token.objects.get_or_create(user = user)
    user_data = {'name':data['first_name'] + ' ' + data['last_name'],'roll_number':data['roll_number'],'email':data['email'],'token':token.key, 'profile_picture':'https://gymkhana.iitb.ac.in'+data['profile_picture']}
    return JsonResponse(user_data)

@api_view(['POST','PUT'])
def register(request):
    if request.method == 'POST':
        handle_uploaded_file(request.FILES['resume'])
        try:
            user = UserDetails.objects.get(roll_number = request.POST['roll_number'])
            user.topskills = request.POST['topskills']
            user.skills = request.POST['skills']
            user.resume = request.FILES['resume'].name
        except:
            user = UserDetails(name=request.POST['name'],roll_number = request.POST['roll_number'],topskills = request.POST['topskills'],skills=request.POST['skills'],resume = request.FILES['resume'].name)
        user.save()
        return JsonResponse({'success':True})
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        try:
            user = UserDetails.objects.get(roll_number=data['roll_number'])
        except:
            return JsonResponse({'success':False})
        return JsonResponse({'success':True,'topskills':user.topskills,'skills':user.topskills,'resume':request.build_absolute_uri(user.resume.url)})

