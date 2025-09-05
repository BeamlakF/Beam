from django.contrib import admin
from .models import Articles, ContactMessage, CV

admin.site.register(Articles)
admin.site.register(ContactMessage)
admin.site.register(CV)
