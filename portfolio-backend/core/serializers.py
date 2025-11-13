from rest_framework import serializers
from .models import CV, ContactMessage

class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = ["id", "file", "uploaded_at"]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
