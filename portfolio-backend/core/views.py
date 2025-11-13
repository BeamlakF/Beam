from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.http import FileResponse, Http404
from .models import CV, ContactMessage
from .serializers import CVSerializer, ContactMessageSerializer
import os

class CVListCreateView(generics.ListCreateAPIView):
    queryset = CV.objects.all().order_by("-uploaded_at")
    serializer_class = CVSerializer

class LatestCVDownloadView(generics.RetrieveAPIView):
    queryset = CV.objects.all().order_by("-uploaded_at")
    serializer_class = CVSerializer

    def get_object(self):
        obj = self.queryset.first()
        if not obj:
            raise Http404("No CV uploaded yet.")
        return obj

    # we override get to return FileResponse forcing download
    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        file_path = obj.file.path
        if not os.path.exists(file_path):
            raise Http404("File not found.")
        filename = os.path.basename(file_path)
        response = FileResponse(open(file_path, "rb"))
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        obj = serializer.save()
        subject = f"Portfolio contact: {obj.subject or 'No subject'}"
        message = f"Name: {obj.name}\nEmail: {obj.email}\n\n{obj.message}"
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.EMAIL_HOST_USER])
        except Exception as e:
            # do not block the request; log the error
            print("Failed to send notification email:", e)
