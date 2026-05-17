from django.urls import path
from .views import EventCreateView,home_context

urlpatterns = [
    path("track/", EventCreateView.as_view(), name="event-track"),
    path("home-context/", home_context, name="home-context"),
    path("create/", EventCreateView.as_view(), name="event-create"),
]