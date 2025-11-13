# beam/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Articles
    path('articles/', views.ArticleListCreateView.as_view(), name='article-list-create'),
    path('articles/<slug:slug>/', views.ArticleDetailView.as_view(), name='article-detail'),

    # Projects
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),

    # Contact form
    path('contact/', views.ContactCreateView.as_view(), name='contact-create'),

    # CV download
    path('cv/download/', views.CVDownloadView.as_view(), name='cv-download'),
]
