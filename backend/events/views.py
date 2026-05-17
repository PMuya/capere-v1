from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import Count

from .models import Event
from .serializers import EventSerializer


# --------------------------------------------------
# 1. MANUAL EVENT CREATION (existing feature)
# --------------------------------------------------
class EventCreateView(APIView):

    def post(self, request):
        serializer = EventSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --------------------------------------------------
# 2. INTELLIGENCE LAYER (NEW)
# --------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def home_context(request):

    user = request.user

    # recent activity
    recent_events = Event.objects.filter(user=user).order_by("-created_at")[:10]

    # most used categories/modules
    top_modules = (
        Event.objects.filter(user=user)
        .values("event_category")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )

    # last event (resume point)
    last_event = Event.objects.filter(user=user).order_by("-created_at").first()

    return Response({
        "status": "success",
        "data": {
            "recent_events": EventSerializer(recent_events, many=True).data,
            "top_modules": list(top_modules),
            "last_event": last_event.event_type if last_event else None,
        }
    })