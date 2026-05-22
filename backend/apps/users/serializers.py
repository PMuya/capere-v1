from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .models import Institution


# =========================================
# REGISTER SERIALIZER
# =========================================
class RegisterSerializer(serializers.Serializer):

    # Institution fields
    institution_name = serializers.CharField()
    institution_code = serializers.CharField()

    # User fields
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        # -----------------------------
        # CREATE INSTITUTION
        # -----------------------------
        institution = Institution.objects.create(
            name=validated_data["institution_name"],
            code=validated_data["institution_code"]
        )

        # -----------------------------
        # CREATE FIRST ADMIN USER
        # -----------------------------
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role="SUPER_ADMIN",
            institution=institution
        )

        return user


# =========================================
# LOGIN SERIALIZER
# =========================================
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
                "email": user.email,
                "role": user.role,

                "institution": {
                    "id": user.institution.id,
                    "name": user.institution.name,
                    "code": user.institution.code,
                } if user.institution else None
            }
        }