from .models import Event
from django.db.models import Count


def get_user_home_context(user):

    # Last 10 events
    recent_events = Event.objects.filter(user=user).order_by('-created_at')[:10]

    # Most used modules
    top_modules = (
        Event.objects.filter(user=user)
        .values("event_category")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )

    # Last visited page
    last_event = Event.objects.filter(user=user).order_by('-created_at').first()

    return {
        "recent_events": recent_events,
        "top_modules": list(top_modules),
        "last_event": last_event.event_type if last_event else None,
    }