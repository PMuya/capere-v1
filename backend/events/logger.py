from .models import Event


def log_event(user, institution, event_type, request=None, payload=None):

    try:
        Event.objects.create(
            user=user,
            institution=institution,
            event_type=event_type,
            payload=payload or {},
            context={
                "path": request.path if request else None,
                "method": request.method if request else None,
            } if request else {}
        )
    except Exception:
        # Never break system flow because of logging
        pass