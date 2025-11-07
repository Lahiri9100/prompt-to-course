from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.generate_course, name='generate_course'),
]
