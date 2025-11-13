from rest_framework import viewsets, filters
from .models import Article, Project
from .serializers import ArticleSerializer, ProjectSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(published=True).order_by("-created_at")
    serializer_class = ArticleSerializer
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "excerpt", "body"]

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]
