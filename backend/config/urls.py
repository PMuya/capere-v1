from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health),

    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/onboarding/', include('apps.onboarding.urls')),
]