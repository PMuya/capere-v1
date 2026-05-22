from django.db import models
from apps.users.models import Institution
from subjects.models import Subject

# ==========================================
# CURRICULUM ROOT (per institution)
# ==========================================
class Curriculum(models.Model):
    institution = models.ForeignKey(
        Institution,
        on_delete=models.CASCADE,
        related_name="curricula"
    )

    name = models.CharField(max_length=255, default="Default Curriculum")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.institution.name}"


# ==========================================
# ACADEMIC YEAR
# ==========================================
class AcademicYear(models.Model):

    curriculum = models.ForeignKey(
    Curriculum,
    on_delete=models.CASCADE,
    related_name="nodes",
    null=True,
    blank=True
)

    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


# ==========================================
# TERMS / SEMESTERS
# ==========================================
class Term(models.Model):

    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.CASCADE,
        related_name="terms"
    )

    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


# ==========================================
# GLOBAL CURRICULUM RULES
# ==========================================
class CurriculumRule(models.Model):

    curriculum = models.OneToOneField(
        Curriculum,
        on_delete=models.CASCADE,
        related_name="rules"
    )

    max_subjects_per_student = models.PositiveIntegerField(default=8)
    min_subjects_per_student = models.PositiveIntegerField(default=7)

    allow_co_curricular = models.BooleanField(default=True)
    max_co_curricular = models.PositiveIntegerField(default=2)

    def __str__(self):
        return f"Rules - {self.curriculum.name}"


# ==========================================
# TREE ENGINE (PATHWAY / BRANCH / GROUP)
# ==========================================
class CurriculumNode(models.Model):

    class NodeType(models.TextChoices):
        PATHWAY = "PATHWAY", "Pathway"
        BRANCH = "BRANCH", "Branch"
        GROUP = "GROUP", "Group"
        SUBJECT_CONTAINER = "SUBJECT_CONTAINER", "Subject Container"

    curriculum = models.ForeignKey(
        Curriculum,
        on_delete=models.CASCADE,
        related_name="nodes"   # ✅ FIXED (was academic_years)
    )
    curriculum = models.ForeignKey(
    Curriculum,
    on_delete=models.CASCADE,
    related_name="academic_years",
    null=True,
    blank=True
)

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="children"
    )

    name = models.CharField(max_length=255)

    node_type = models.CharField(
        max_length=30,
        choices=NodeType.choices
    )

    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.node_type})"


# ==========================================
# SUBJECT CONSTRAINTS (TIMETABLE RULES)
# ==========================================
class SubjectConstraint(models.Model):

    subject = models.OneToOneField(
        Subject,
        on_delete=models.CASCADE,
        related_name="constraints"
    )

    lessons_per_week = models.PositiveIntegerField(default=5)

    max_lessons_per_day = models.PositiveIntegerField(default=2)

    allow_double_lessons = models.BooleanField(default=False)

    max_double_lessons_per_week = models.PositiveIntegerField(default=0)

    preferred_consecutive = models.BooleanField(default=False)

    requires_lab = models.BooleanField(default=False)

    requires_projector = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Constraints - {self.subject.name}"

# ==========================================
# SUBJECT ↔ TREE NODE MAPPING
# ==========================================
class NodeSubject(models.Model):

    node = models.ForeignKey(
        CurriculumNode,
        on_delete=models.CASCADE,
        related_name="subjects"
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="node_mappings"
    )

    is_compulsory = models.BooleanField(default=False)

    is_optional = models.BooleanField(default=True)

    group_tag = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["node", "subject"]
        ordering = ["display_order", "subject__name"]

    def __str__(self):
        return f"{self.node.name} → {self.subject.name}"

# ==========================================
# OPTIONAL: ACADEMIC LEVELS
# ==========================================
class AcademicLevel(models.Model):

    institution = models.ForeignKey(
        Institution,
        on_delete=models.CASCADE,
        related_name="academic_levels"
    )

    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name


# ==========================================
# OPTIONAL: STREAMS
# ==========================================
class Stream(models.Model):

    academic_level = models.ForeignKey(
        AcademicLevel,
        on_delete=models.CASCADE,
        related_name="streams"
    )

    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField(default=40)

    def __str__(self):
        return f"{self.academic_level.name} - {self.name}"