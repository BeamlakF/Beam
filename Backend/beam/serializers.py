from rest_framework import serializers
from .models import ProfileCV, Article, Project, ContactMessage

class ProfileCVSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileCV
        fields = ['id', 'file', 'uploaded_at']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id','title','slug','excerpt','content','cover_image','published_at','is_published']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','title','slug','description','project_type','cover_image','live_url','repo_url','created_at','is_published']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id','name','email','subject','message','is_read','created_at']
        read_only_fields = ['is_read','created_at']
