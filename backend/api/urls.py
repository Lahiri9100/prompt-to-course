from django.urls import path
from .views import RegisterView, LoginView
from .generator_views import GenerateCourseView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("generate-course/", GenerateCourseView.as_view(), name="generate-course"),
]
