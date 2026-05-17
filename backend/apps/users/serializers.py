from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from events.models import Institution


# -----------------------------
# REGISTER USER
# -----------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    institution_code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "role", "institution_code"]

    def create(self, validated_data):
        institution_code = validated_data.pop("institution_code")

        try:
            institution = Institution.objects.get(code=institution_code)
        except Institution.DoesNotExist:
            raise serializers.ValidationError("Institution not found")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data.get("role", "STUDENT"),
        )

        # attach institution dynamically (we will refine later)
        user.save()

        return user


# -----------------------------
# LOGIN USER
# -----------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            username=data["username"],
            password=data["password"]
        )

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role
            }
        }