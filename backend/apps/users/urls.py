from django.http import JsonResponse


from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView
from .views import TeacherOnlyView



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('teacher-area/', TeacherOnlyView.as_view(), name='teacher-area'),
]