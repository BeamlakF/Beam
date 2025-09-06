from rest_framework import serializers
from .models import Article, ContactMessage, CV

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"

class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = "__all__"
