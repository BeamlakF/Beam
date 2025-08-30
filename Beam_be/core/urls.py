from django.urls import path
from .views import (
    PublicArticleListView,
    ArticleDetailView,
    ArticleCreateView,
    ContactMessageCreateView,
    ContactMessageListView,
    SubscriberCreateView,
    SubscriberListView
)

urlpatterns = [
    path('subscribers/', SubscriberListView.as_view(), name='subscriber-list'),
    path('subscriber/', SubscriberCreateView.as_view(), name='subscriber-create'),
    path('articles/', PublicArticleListView.as_view(), name='articles-view'),
    path('articles/create/', ArticleCreateView.as_view(), name='article-create'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-updates'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('contactmessages/', ContactMessageListView.as_view(), name='contact-list'),
]
