from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Event(models.Model):

    EVENT_TYPES = [
        ("auth.login", "Login"),
        ("auth.logout", "Logout"),
        ("navigation.visit", "Navigation Visit"),
        ("workflow.start", "Workflow Start"),
        ("workflow.progress", "Workflow Progress"),
        ("workflow.complete", "Workflow Complete"),
        ("recommendation.shown", "Recommendation Shown"),
        ("recommendation.clicked", "Recommendation Clicked"),
        ("system.error", "System Error"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="events"
    )

    institution = models.ForeignKey(
        "users.Institution",
        on_delete=models.CASCADE,
        related_name="events",
        null=True,
        blank=True
    )

    event_type = models.CharField(max_length=100, choices=EVENT_TYPES)
    event_category = models.CharField(max_length=100, null=True, blank=True)

    payload = models.JSONField(default=dict)
    context = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_type} - {self.user}"