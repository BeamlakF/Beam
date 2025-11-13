from django.urls import path
from .views import CVListCreateView, LatestCVDownloadView, ContactMessageCreateView

urlpatterns = [
    path("cv/", CVListCreateView.as_view(), name="cv-list-create"),
    path("cv/latest/", LatestCVDownloadView.as_view(), name="cv-latest"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-create"),
]
