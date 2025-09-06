from django.db import models

from django.db import models



class Article(models.Model):
    title = models.TextField() 
    content = models.TextField(max_length = 1000)
    slug = models.SlugField()
    published_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField()
    image = models.ImageField(upload_to='articles/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()  
    text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
    

class CV(models.Model):
    file = models.FileField(upload_to="cv/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV uploaded on {self.uploaded_at}"