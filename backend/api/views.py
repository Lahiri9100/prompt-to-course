# backend/api/views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Read raw data (avoid serializer introspection issues)
        full_name = request.data.get("full_name") or request.data.get("name") or ""
        email = request.data.get("email")
        password = request.data.get("password")

        # Basic validation
        if not email or not password:
            return Response(
                {"error": "email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(password) < 6:
            return Response(
                {"error": "password must be at least 6 characters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Prevent duplicate email
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # create user (use email as username for convenience)
            user = User.objects.create_user(
                username=email, email=email, password=password
            )
            # store full name (first_name or split)
            user.first_name = full_name
            user.save()
        except IntegrityError:
            return Response(
                {"error": "Could not create user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as exc:
            # Return the error message for debugging on server logs (don't expose sensitive details in prod)
            return Response(
                {"error": "Internal server error", "details": str(exc)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # authenticate using username=email
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # create tokens using SimpleJWT
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )
