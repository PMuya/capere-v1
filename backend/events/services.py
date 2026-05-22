from .models import Event
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta


class BehaviorService:

    def __init__(self, user):
        self.user = user

    # -----------------------------
    # 1. RECENT ACTIVITY (UNCHANGED BUT CLEANED)
    # -----------------------------
    def get_recent_events(self):
        return Event.objects.filter(
            user=self.user
        ).order_by("-created_at")[:10]

    # -----------------------------
    # 2. TOP MODULES (IMPROVED SIGNAL)
    # -----------------------------
    def get_top_modules(self):
        return (
            Event.objects.filter(user=self.user)
            .values("event_category")
            .annotate(count=Count("id"))
            .order_by("-count")[:5]
        )

    # -----------------------------
    # 3. LAST ACTIVITY (SAFE ACCESS)
    # -----------------------------
    def get_last_event(self):
        return Event.objects.filter(
            user=self.user
        ).order_by("-created_at").first()

    # -----------------------------
    # 4. ENGAGEMENT SIGNAL (NEW)
    # -----------------------------
    def get_engagement_level(self):

        last_24h = timezone.now() - timedelta(hours=24)

        count = Event.objects.filter(
            user=self.user,
            created_at__gte=last_24h
        ).count()

        if count < 5:
            return "low"
        elif count < 15:
            return "medium"
        return "high"

    # -----------------------------
    # 5. FULL HOME CONTEXT (UPGRADED OUTPUT)
    # -----------------------------
    def get_home_context(self):

        last_event = self.get_last_event()

        return {
            "recent_events": self.get_recent_events(),
            "top_modules": list(self.get_top_modules()),
            "last_event": last_event.event_type if last_event else None,
            "engagement_level": self.get_engagement_level(),
        }