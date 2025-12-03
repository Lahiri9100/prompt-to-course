from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

class GenerateCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")

        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)

        system_prompt = """
        You are an expert curriculum designer.
        Given a topic or goal, create a detailed structured learning roadmap in JSON.

        Example format:
        {
            "title": "Full-Stack Development Roadmap",
            "modules": [
                {
                    "name": "HTML & CSS",
                    "topics": [
                        "HTML basics",
                        "CSS selectors",
                        "Flexbox"
                    ]
                },
                {
                    "name": "JavaScript",
                    "topics": ["Variables", "DOM", "Fetch API"]
                }
            ]
        }
        """

        completion = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Create a course for: {prompt}"}
            ]
        )

        json_output = completion["choices"][0]["message"]["content"]

        return Response({"course": json_output})
