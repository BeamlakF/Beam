from rest_framework import serializers
from .models import Article, Project

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "slug", "excerpt", "body", "cover", "published", "created_at"]

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "thumbnail", "project_type", "live_url", "repo_url", "created_at"]
