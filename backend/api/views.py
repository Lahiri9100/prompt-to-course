from django.shortcuts import render

from django.http import JsonResponse

def generate_course(request):
    data = {
        "message": "API is working!",
        "status": "success"
    }
    return JsonResponse(data)
