from django.urls import path

from .views import (
    CurriculumNodeCreateView,
    CurriculumTreeView,
    NodeSubjectAttachView,
    CurriculumRuleView,
    AcademicYearView,
    TermView,
    CurriculumNodeDeleteView,
    CurriculumNodeUpdateView,
)
urlpatterns = [
    # ==========================================
    # CURRICULUM TREE (CORE)
    # ==========================================
    path(
        "tree/<int:curriculum_id>/",
        CurriculumTreeView.as_view(),
        name="curriculum-tree"
    ),
    # ==========================================
    # NODE CREATION (PATHWAY / BRANCH / GROUP)
    # ==========================================
    path(
        "node/create/",
        CurriculumNodeCreateView.as_view(),
        name="node-create"
    ),
    # ==========================================
    # SUBJECT ATTACHMENT TO NODE
    # ==========================================
    path(
        "node/attach-subject/",
        NodeSubjectAttachView.as_view(),
        name="node-attach-subject"
    ),
    # ==========================================
    # CURRICULUM RULES
    # ==========================================
    path(
        "rules/<int:curriculum_id>/",
        CurriculumRuleView.as_view(),
        name="curriculum-rules"
    ),
    # ==========================================
    # ACADEMIC YEAR
    # ==========================================
    path(
        "academic-year/",
        AcademicYearView.as_view(),
        name="academic-year"
    ),
    # ==========================================
    # TERM
    # ==========================================
    path(
        "term/",
        TermView.as_view(),
        name="term"
    ),
    path(
        "node/<int:node_id>/delete/",
        CurriculumNodeDeleteView.as_view(),
        name="node-delete"
    ),
    path(
        "node/<int:node_id>/update/",
        CurriculumNodeUpdateView.as_view(),
        name="node-update"
    ),
]