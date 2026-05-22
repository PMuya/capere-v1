from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    # ADMIN
    path("admin/", admin.site.urls),

    # HEALTH CHECK
    path("api/health/", health),

    # USERS (AUTH + MANAGEMENT)
    path("api/v1/users/", include("apps.users.urls")),
    path("api/v1/auth/", include("apps.users.urls")),

    # ONBOARDING
    path("api/v1/onboarding/", include("apps.onboarding.urls")),

    # EVENTS (INTELLIGENCE LAYER)
    path("api/v1/events/", include("events.urls")),

    # SUBJECTS (NEW)
    path("api/v1/subjects/", include("subjects.urls")),
    # CURRICULUM
    path("api/v1/curriculum/", include("apps.curriculum.urls")),
]