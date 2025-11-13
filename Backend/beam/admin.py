from django.contrib import admin
from .models import ProfileCV, Article, Project, ContactMessage

@admin.register(ProfileCV)
class ProfileCVAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'published_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'is_published', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
