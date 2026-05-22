from .logger import log_event


class EventMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        response = self.get_response(request)

        try:
            user = getattr(request, "user", None)

            if not user or not user.is_authenticated:
                return response

            institution = getattr(user, "institution", None)

            # 🔥 BASIC NOISE FILTERING
            if request.path.startswith("/admin/"):
                return response

            if request.path.startswith("/static/"):
                return response

            if request.path.startswith("/favicon.ico"):
                return response

            # 🔥 SMART EVENT TYPE CLASSIFICATION
            event_type = self._classify_event(request, response)

            # 🔥 RICH PAYLOAD
            payload = {
                "path": request.path,
                "method": request.method,
                "status_code": getattr(response, "status_code", None),
                "query_params": dict(request.GET) if request.GET else {},
            }

            log_event(
                user=user,
                institution=institution,
                event_type=event_type,
                request=request,
                payload=payload
            )

        except Exception:
            # NEVER break app flow because of analytics
            pass

        return response

    def _classify_event(self, request, response):

        path = request.path.lower()

        # AUTH EVENTS
        if "login" in path:
            return "auth.login"

        if "logout" in path:
            return "auth.logout"

        # WRITE OPERATIONS = WORKFLOW INTENT
        if request.method == "POST":
            return "workflow.start"

        if request.method in ["PUT", "PATCH"]:
            return "workflow.progress"

        if request.method == "DELETE":
            return "workflow.complete"

        # READ OPERATIONS
        if request.method == "GET":
            return "navigation.visit"

        # ERROR STATE
        if getattr(response, "status_code", 200) >= 400:
            return "system.error"

        return "navigation.visit"