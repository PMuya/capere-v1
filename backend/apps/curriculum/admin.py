from django.contrib import admin

from .models import (
    AcademicYear,
    Term,
    AcademicLevel,
    Stream,
    Subject,
    SubjectConstraint,
)


admin.site.register(AcademicYear)
admin.site.register(Term)
admin.site.register(AcademicLevel)
admin.site.register(Stream)
admin.site.register(Subject)
admin.site.register(SubjectConstraint)