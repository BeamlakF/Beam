from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import FileResponse, Http404
from django.core.mail import send_mail
from django.conf import settings
from django.views import View

from .models import ProfileCV, Article, Project, ContactMessage
from .serializers import (ProfileCVSerializer, ArticleSerializer,
                          ProjectSerializer, ContactMessageSerializer)

# Articles
class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

# Projects
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

# Contact create (saves and tries to email to DEFAULT_FROM_EMAIL)
class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        message = serializer.save()
        subject = f"New contact: {message.subject or 'No subject'}"
        body = f"From: {message.name} <{message.email}>\n\n{message.message}"
        try:
            send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_FROM_EMAIL])
        except Exception:
            # If sending fails, we still keep the message. In production log the exception.
            pass

# CV download (serves latest uploaded)
class CVDownloadView(View):
    def get(self, request, *args, **kwargs):
        cv = ProfileCV.objects.order_by('-uploaded_at').first()
        if not cv or not cv.file:
            raise Http404("No CV available.")
        # Using FileResponse to stream file as an attachment
        filename = cv.file.name.split('/')[-1]
        return FileResponse(cv.file.open('rb'), as_attachment=True, filename=filename)
