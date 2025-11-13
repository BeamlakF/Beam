from django.db import models

class CV(models.Model):
    file = models.FileField(upload_to="cv/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV uploaded {self.uploaded_at:%Y-%m-%d %H:%M}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.subject or 'no-subject'}"
