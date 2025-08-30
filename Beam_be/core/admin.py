from django.contrib import admin
from .models import Articles, ContactMessage, Subscriber

class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'published_at', 'is_published')

class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'sent_at')

admin.site.register(Subscriber, SubscriberAdmin)
admin.site.register(Articles, ArticlesAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
