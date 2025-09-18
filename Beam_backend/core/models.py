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


from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=300, help_text="Comma-separated list of technologies")
    link = models.URLField(blank=True, null=True, help_text="Live site or repository link")
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    year = models.PositiveIntegerField(help_text="Year the project was completed")
    
    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "-created_at"]  # latest projects first

    def __str__(self):
        return self.title




class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.name} ({self.email})"


class CV(models.Model):
    file = models.FileField(upload_to="cv/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV uploaded on {self.uploaded_at}"
