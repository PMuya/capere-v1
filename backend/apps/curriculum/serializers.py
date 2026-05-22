from rest_framework import serializers

from .models import (
    Curriculum,
    AcademicYear,
    Term,
    CurriculumRule,
    CurriculumNode,
    Subject,
    SubjectConstraint,
    NodeSubject,
)


# ==========================================
# SUBJECT SERIALIZER
# ==========================================
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


# ==========================================
# SUBJECT CONSTRAINTS SERIALIZER
# ==========================================
class SubjectConstraintSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectConstraint
        fields = "__all__"


# ==========================================
# NODE SUBJECT (MAPPING)
# ==========================================
class NodeSubjectSerializer(serializers.ModelSerializer):

    subject = SubjectSerializer(read_only=True)
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        source="subject",
        write_only=True
    )

    class Meta:
        model = NodeSubject
        fields = [
            "id",
            "node",
            "subject",
            "subject_id",
            "is_compulsory",
            "is_optional",
            "group_tag",
        ]


# ==========================================
# CURRICULUM RULES
# ==========================================
class CurriculumRuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = CurriculumRule
        fields = "__all__"


# ==========================================
# ACADEMIC YEAR
# ==========================================
class AcademicYearSerializer(serializers.ModelSerializer):

    class Meta:
        model = AcademicYear
        fields = "__all__"


# ==========================================
# TERM
# ==========================================
class TermSerializer(serializers.ModelSerializer):

    class Meta:
        model = Term
        fields = "__all__"


# ==========================================
# CURRICULUM NODE TREE (CORE ENGINE)
# ==========================================
class CurriculumNodeTreeSerializer(serializers.ModelSerializer):

    children = serializers.SerializerMethodField()
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = CurriculumNode
        fields = [
            "id",
            "name",
            "node_type",
            "parent",
            "order",
            "children",
            "subjects",
        ]

    def get_children(self, obj):
        children = obj.children.all().order_by("order")
        return CurriculumNodeTreeSerializer(children, many=True).data

    def get_subjects(self, obj):
        mappings = obj.subjects.all()
        return NodeSubjectSerializer(mappings, many=True).data


# ==========================================
# CURRICULUM ROOT SERIALIZER
# ==========================================
class CurriculumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Curriculum
        fields = "__all__"