from django.db import models
from apps.users.models import Institution
from apps.users.models import User


class Subject(models.Model):

    CATEGORY_CHOICES = [
        ("Sciences", "Sciences"),
        ("Languages", "Languages"),
        ("Mathematics", "Mathematics"),
        ("Humanities", "Humanities"),
        ("Technical", "Technical"),
        ("Creative", "Creative"),
    ]

    # ✅ Institution (your School model acts as Institution)
    institution = models.ForeignKey(
        "users.Institution",
        on_delete=models.CASCADE,
        related_name="subjects"
    )

    name = models.CharField(max_length=255)

    code = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        blank=True,
        null=True
    )

    is_core = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # audit trail
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="subjects_created"
    )

    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="subjects_updated"
    )

    class Meta:
        unique_together = ["institution", "name"]
        ordering = ["name"]

    def save(self, *args, **kwargs):
        self.name = self.name.strip().title()

        if self.code:
            self.code = self.code.strip().upper()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name