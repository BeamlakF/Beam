from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r"articles", ArticleViewSet, basename="articles")
router.register(r"projects", ProjectViewSet, basename="projects")

urlpatterns = router.urls
