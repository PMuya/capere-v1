from .logger import log_event


class EventMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        response = self.get_response(request)

        user = getattr(request, "user", None)

        if user and user.is_authenticated:

            institution = getattr(user, "institution", None)

            log_event(
                user=user,
                institution=institution,
                event_type="navigation.visit",
                request=request,
                payload={
                    "status_code": getattr(response, "status_code", None)
                }
            )

        return response