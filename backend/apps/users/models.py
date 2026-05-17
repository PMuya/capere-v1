from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class Role(models.TextChoices):
        SUPER_ADMIN = "SUPER_ADMIN", "Super Admin"
        ADMIN = "ADMIN", "Admin"
        TEACHER = "TEACHER", "Teacher"
        STUDENT = "STUDENT", "Student"
        PARENT = "PARENT", "Parent"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT
    )

    # 🔥 ADD THIS
    school = models.ForeignKey(
        "schools.School",
        on_delete=models.CASCADE,
        related_name="users",
        null=True,
        blank=True
    )

    institution = models.ForeignKey(
    "events.Institution",
    on_delete=models.CASCADE,
    null=True,
    blank=True,
    related_name="users"
)

    def __str__(self):
        return f"{self.username} ({self.role})"