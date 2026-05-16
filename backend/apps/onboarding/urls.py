from django.urls import path
from .views import OnboardingCurrentStepView, OnboardingAnswerView

urlpatterns = [
    path('current/', OnboardingCurrentStepView.as_view()),
    path('answer/', OnboardingAnswerView.as_view()),
]