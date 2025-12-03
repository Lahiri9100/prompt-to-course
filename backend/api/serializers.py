from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["full_name", "email", "password"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        full_name = validated_data.pop("full_name")
        email = validated_data.get("email")
        password = validated_data.get("password")

        # SAFE USER CREATION
        username = email  # username required in Django default user model

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        # store full name inside first_name (since your model doesn't have full_name)
        user.first_name = full_name
        user.save()

        return user
    
from rest_framework import serializers
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid login credentials")

        data["user"] = user
        return data
