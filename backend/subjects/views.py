from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Subject
from .serializers import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):

    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        try:

            print("========== GET QUERYSET ==========")
            print("REQUEST USER:", self.request.user)
            print("USER INSTITUTION:", self.request.user.institution)

            qs = Subject.objects.filter(
                institution=self.request.user.institution
            )

            print("QUERYSET SUCCESS")

            return qs

        except Exception as e:

            print("========== GET QUERYSET ERROR ==========")
            print(str(e))

            raise e
    def perform_create(self, serializer):

        try:

            print("========== CREATE SUBJECT ==========")
            print("REQUEST DATA:", self.request.data)

            serializer.save(
                institution=self.request.user.institution,
                created_by=self.request.user,
                updated_by=self.request.user
            )

            print("SUBJECT CREATED SUCCESSFULLY")

        except Exception as e:

            print("========== CREATE ERROR ==========")
            print(str(e))

            raise e