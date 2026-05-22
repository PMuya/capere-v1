from rest_framework import serializers

from .models import Subject


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject

        fields = "__all__"

        read_only_fields = [
            "institution",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
        ]