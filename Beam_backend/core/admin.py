from django.contrib import admin
from .models import Article, ContactMessage, CV

admin.site.register(Article)
admin.site.register(ContactMessage)
admin.site.register(CV)
