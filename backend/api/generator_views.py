from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

# Try to import Gemini SDK. If not installed (local machine), avoid crash.
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ModuleNotFoundError:
    GEMINI_AVAILABLE = False


class GenerateCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")

        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)

        # If Gemini SDK exists & API key is set → use Gemini
        if GEMINI_AVAILABLE and settings.GEMINI_API_KEY:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                model = genai.GenerativeModel("gemini-pro")

                response = model.generate_content(
                    f"Create a structured learning course in JSON format for: {prompt}"
                )

                return Response({"course": response.text})

            except Exception as e:
                return Response(
                    {"error": "Gemini failed", "details": str(e)},
                    status=500
                )

        # If no Gemini SDK installed → return MOCK SAFE OUTPUT
        mock_course = {
            "title": f"Course for {prompt}",
            "modules": [
                {
                    "name": "Module 1: Basics",
                    "topics": ["Introduction", "Core Concepts", "Setup"]
                },
                {
                    "name": "Module 2: Intermediate",
                    "topics": ["Hands-on Project", "Real Use Cases"]
                }
            ]
        }

        return Response({
            "notice": "Gemini SDK not installed — returning mock course",
            "course": mock_course
        })
