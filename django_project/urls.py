# urls.py
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from front_end.views import serve_react, JournalEntryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'journal', JournalEntryViewSet, basename='journal')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # This regex matches any path that does NOT start with /api
    re_path(r'^(?!api/|admin/).*$', serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
