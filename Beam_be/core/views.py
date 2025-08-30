from django.shortcuts import render
from rest_framework import generics
from .models import Subscriber, ContactMessage, Articles
from .serializers import SubscriberSerializer,  ArticlesSerializer
from .serializers import ContactMessageSerializer
from rest_framework.permissions import IsAdminUser
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import send_mass_mail


class PublicArticleListView(generics.ListAPIView):
    queryset = Articles.objects.filter(is_published = True)
    serializer_class = ArticlesSerializer

class SubscriberListView(generics.ListAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [IsAdminUser]

class SubscriberCreateView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    



class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class =ArticlesSerializer


class ArticleCreateView(generics.CreateAPIView):
    queryset = Articles.objects.all()
    serializer_class =ArticlesSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        article = serializer.save

        subject = f"New Article: {article.title}",
        message = f"Read the new article: {article.content}\n\nThanks for subscribing!",
        from_email = settings.DEFAULT_FROM_EMAIL

        recipient_list = [subscriber.email for subscriber in Subscriber.objects.all()]
        messages = [(subject, message, from_email, [email]) for email in recipient_list]

        send_mass_mail(messages, fail_silently=True)



class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminUser]


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact = serializer.save()

        # 1️⃣ Send email notification to the lawyer
        send_mail(
            subject=f"📩 New Consultation from {contact.name}",
            message=f"Message from {contact.name} ({contact.email}):\n\n{contact.text}",
            from_email=settings.DEFAULT_FROM_EMAIL,  # lawyer’s email
            recipient_list=[settings.DEFAULT_FROM_EMAIL],  # lawyer’s email
            fail_silently=False,
        )

        # 2️⃣ Send confirmation email to the sender
        send_mail(
            subject="✅ Your message has been received",
            message=(
                f"Hi {contact.name},\n\n"
                "Thank you for reaching out! Your message has been received by Fekadu Hailemariam.\n"
                "We will get back to you as soon as possible.\n\n"
                "Your message was:\n"
                f"{contact.text}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,  # lawyer’s email
            recipient_list=[contact.email],          # sender’s email
            fail_silently=False,
        )
