from django.db import models
from django.conf import settings


class OnboardingSession(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    role = models.CharField(max_length=20)
    current_step = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

class OnboardingAnswer(models.Model):
    session = models.ForeignKey(OnboardingSession, on_delete=models.CASCADE, related_name="answers")

    step_index = models.IntegerField()
    question = models.TextField()
    answer = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)