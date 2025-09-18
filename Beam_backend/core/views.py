from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

from .models import Article, ContactMessage, CV, Project
from .serializers import ArticleSerializer, ContactMessageSerializer, CVSerializer, ProjectSerializer


# ==============================
# 📌 Articles
# ==============================

class PublicArticleListView(generics.ListAPIView):
    """Public can see only published articles"""
    queryset = Article.objects.filter(is_published=True).order_by("-published_at")  # ✅ fixed
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]


class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin can edit, public can only view"""
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAdminUser()]
        return [AllowAny()]


class ArticleCreateView(generics.CreateAPIView):
    """Admin creates article → notify subscribers"""
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        article = serializer.save()

        subject = f"📰 New Article: {article.title}"
        message = f"{article.content[:200]}...\n\nRead more on the website."
        from_email = settings.DEFAULT_FROM_EMAIL
        # Example: notify subscribers if model exists later
        # recipient_list = [sub.email for sub in Subscriber.objects.all()]
        # send_mass_mail(messages, fail_silently=True)



class PublicProjectListView(generics.ListAPIView):
    """Public can see only published projects"""
    queryset = Project.objects.filter(is_published=True).order_by("-created_at")
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


class ProjectCreateView(generics.CreateAPIView):
    """Admin creates project"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminUser]        


# ==============================
# 📌 Contact Messages
# ==============================

class ContactMessageListView(generics.ListAPIView):
    """Admin can view all contact messages"""
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminUser]


class ContactMessageCreateView(generics.CreateAPIView):
    """Public can submit contact messages"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        contact = serializer.save()

        # 1️⃣ Notify the lawyer
        send_mail(
            subject=f"📩 New Consultation from {contact.name}",
            message=f"Message from {contact.name} ({contact.email}):\n\n{contact.message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=False,
        )

        # 2️⃣ Confirmation to sender
        send_mail(
            subject="✅ Your message has been received",
            message=(
                f"Hi {contact.name},\n\n"
                "Thank you for reaching out! Your message has been received.\n"
                "We will get back to you as soon as possible.\n\n"
                "Your message was:\n"
                f"{contact.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=False,
        )


# ==============================
# 📌 CV Download
# ==============================

class CVDownloadView(generics.RetrieveAPIView):
    """Return latest CV file URL"""
    serializer_class = CVSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return CV.objects.last()

    def retrieve(self, request, *args, **kwargs):
        latest_cv = self.get_object()
        if not latest_cv:
            return Response({"error": "No CV uploaded"}, status=404)
        return Response({"file_url": latest_cv.file.url})
