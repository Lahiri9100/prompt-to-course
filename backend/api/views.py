from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):
    authentication_classes = []         # 🔥 VERY IMPORTANT
    permission_classes = [AllowAny]     # 🔥 PUBLIC ENDPOINT

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = []         # 🔥 IMPORTANT
    permission_classes = [AllowAny]     # 🔥 PUBLIC

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "email": user.email,
                    "full_name": user.full_name,
                }
            }, status=200)

        return Response(serializer.errors, status=400)


# TEMPORARY — Make Generate Open for Now
from rest_framework.decorators import api_view, permission_classes

@api_view(["POST"])
@permission_classes([AllowAny])
def generate_api(request):
    topic = request.data.get("topic", "")
    return Response({
        "youtube_videos": [],
        "articles": [],
        "topic": topic,
    })
