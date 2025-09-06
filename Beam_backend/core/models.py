from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)  
    content = models.TextField(max_length=2000)
    slug = models.SlugField(unique=True)
    published_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)
    image = models.ImageField(upload_to='articles/', blank=True, null=True)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()  # ✅ renamed from "text" → matches views & serializer
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ clearer name

    def __str__(self):
        return f"{self.name} ({self.email})"


class CV(models.Model):
    file = models.FileField(upload_to="cv/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV uploaded on {self.uploaded_at}"
