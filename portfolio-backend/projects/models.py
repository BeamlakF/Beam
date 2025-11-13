from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(blank=True)
    body = models.TextField()
    cover = models.ImageField(upload_to="articles/", null=True, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

PROJECT_TYPE_CHOICES = (
    ("design", "Design"),
    ("dev", "Development"),
)

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="projects/", null=True, blank=True)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES)
    live_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.project_type})"
