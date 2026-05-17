from django.db import models
import uuid


class School(models.Model):

    SCHOOL_TYPES = [
        ("primary", "Primary"),
        ("secondary", "Secondary"),
        ("college", "College"),
        ("university", "University"),
        ("other", "Other"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(max_length=255)

    code = models.CharField(
        max_length=20,
        unique=True
    )

    school_type = models.CharField(
        max_length=50,
        choices=SCHOOL_TYPES
    )

    county = models.CharField(
        max_length=100,
        blank=True
    )

    logo = models.ImageField(
        upload_to="school_logos/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name