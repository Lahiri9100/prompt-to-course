from pathlib import Path
from datetime import timedelta
import os

# -----------------------------------------
# API KEYS (taken from Railway Environment)
# -----------------------------------------
GEMINI_API_KEY = os.getenv("AIzaSyACvn2e8JJOwGfCz_MI5WGM1-zA-qLWIZk", "")
Google_Custom_Search_Key = os.getenv("AIzaSyAvom4_bvj0wVR4f_YaX06QL7MT62utec", "")
YouTube_API_Key = os.getenv("AIzaSyAmNlZ9LLRipWIHTxO72I-0nuwLp9pDBi4", "")

# -----------------------------------------
# BASE SETTINGS
# -----------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-dev-key"

DEBUG = True

ALLOWED_HOSTS = ["*"]


# -----------------------------------------
# APPLICATIONS
# -----------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",

    # Local apps
    "api",
]


# -----------------------------------------
# CUSTOM USER MODEL
# -----------------------------------------
AUTH_USER_MODEL = "api.User"


# -----------------------------------------
# MIDDLEWARE
# -----------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "promptcourse.urls"


# -----------------------------------------
# TEMPLATES
# -----------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "promptcourse.wsgi.application"


# -----------------------------------------
# DATABASE
# -----------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# -----------------------------------------
# PASSWORD VALIDATION
# -----------------------------------------
AUTH_PASSWORD_VALIDATORS = []


# -----------------------------------------
# CORS
# -----------------------------------------
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


# -----------------------------------------
# REST FRAMEWORK
# -----------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}


# -----------------------------------------
# JWT CONFIG
# -----------------------------------------
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=3),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}


# -----------------------------------------
# STATIC FILES
# -----------------------------------------
STATIC_URL = "/static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
