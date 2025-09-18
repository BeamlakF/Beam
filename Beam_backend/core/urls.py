from django.urls import path
from .views import (
    PublicArticleListView, ArticleDetailView, ArticleCreateView,
    ContactMessageListView, ContactMessageCreateView,
    CVDownloadView, PublicProjectListView, ProjectCreateView
)

urlpatterns = [
    path("articles/", PublicArticleListView.as_view(), name="article-list"),
    path("articles/<int:pk>/", ArticleDetailView.as_view(), name="article-detail"),
    path("articles/create/", ArticleCreateView.as_view(), name="article-create"),
    path("projects/", PublicProjectListView.as_view(), name="project-list"),
    path("projects/create/", ProjectCreateView.as_view(), name="project-create"),


    path("contacts/", ContactMessageListView.as_view(), name="contact-list"),
    path("contacts/create/", ContactMessageCreateView.as_view(), name="contact-create"),

    path("cv/download/", CVDownloadView.as_view(), name="cv-download"),
]
