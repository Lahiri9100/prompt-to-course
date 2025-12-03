# api/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, StudentProfile

class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            full_name=validated_data.get("full_name", ""),
        )
        # create an empty profile automatically
        StudentProfile.objects.create(user=user)
        return user

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "email": instance.email,
            "full_name": instance.full_name,
        }


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        # authenticate uses USERNAME_FIELD; for custom user email is username field
        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("User is inactive")
        data["user"] = user
        return data
