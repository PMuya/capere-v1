from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from .models import (
    Curriculum,
    CurriculumNode,
    NodeSubject,
    CurriculumRule,
    AcademicYear,
    Term,
    Subject,
)

from .serializers import (
    CurriculumNodeTreeSerializer,
    NodeSubjectSerializer,
    CurriculumRuleSerializer,
    AcademicYearSerializer,
    TermSerializer,
)

# ==========================================
# 1. CURRICULUM TREE VIEW (READ FULL TREE)
# ==========================================
class CurriculumTreeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, curriculum_id):
        curriculum = get_object_or_404(Curriculum, id=curriculum_id)

        roots = CurriculumNode.objects.filter(
            curriculum=curriculum,
            parent__isnull=True
        ).order_by("order")

        serializer = CurriculumNodeTreeSerializer(roots, many=True)

        return Response({
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

# ==========================================
# 2. CREATE CURRICULUM NODE (PATHWAY / BRANCH / GROUP)
# ==========================================
class CurriculumNodeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Creates any node in the tree:
        - PATHWAY
        - BRANCH
        - GROUP
        """

        data = request.data
        try:
            node = CurriculumNode.objects.create(
                curriculum_id=data.get("curriculum_id"),
                parent_id=data.get("parent_id"),
                name=data.get("name"),
                node_type=data.get("node_type"),
                order=data.get("order", 0),
            )

            return Response({
                "status": "success",
                "id": node.id,
                "message": "Node created"
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

# ==========================================
# 3. ATTACH SUBJECT TO NODE
# ==========================================
class NodeSubjectAttachView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        node_id = request.data.get("node_id")
        subject_id = request.data.get("subject_id")

        mapping = NodeSubject.objects.create(
            node_id=node_id,
            subject_id=subject_id,
            is_compulsory=request.data.get("is_compulsory", False),
            is_optional=request.data.get("is_optional", True),
            group_tag=request.data.get("group_tag")
        )

        return Response({
            "status": "success",
            "id": mapping.id,
            "message": "Subject attached to node"
        }, status=status.HTTP_201_CREATED)

# ==========================================
# 4. CURRICULUM RULES
# ==========================================
class CurriculumRuleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, curriculum_id):
        rule = get_object_or_404(CurriculumRule, curriculum_id=curriculum_id)
        serializer = CurriculumRuleSerializer(rule)

        return Response(serializer.data)

    def post(self, request, curriculum_id):
        rule, created = CurriculumRule.objects.get_or_create(
            curriculum_id=curriculum_id
        )

        serializer = CurriculumRuleSerializer(rule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

# ==========================================
# 5. ACADEMIC YEAR
# ==========================================
class AcademicYearView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AcademicYearSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

# ==========================================
# 6. TERM
# ==========================================
class TermView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TermSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
class CurriculumNodeDeleteView(APIView):
    def delete(self, request, node_id):
        node = get_object_or_404(CurriculumNode, id=node_id)
        node.delete()

        return Response(
            {"message": "Node deleted"},
            status=status.HTTP_200_OK
        )
    
class CurriculumNodeUpdateView(APIView):
    def patch(self, request, node_id):
        node = get_object_or_404(CurriculumNode, id=node_id)

        node.name = request.data.get("name", node.name)
        node.save()

        return Response({"message": "updated"})