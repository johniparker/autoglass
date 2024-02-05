from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from front_end.views import serve_react, add_numbers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/add/', add_numbers, name='add_numbers'),
    # Catch-all pattern for serving the React app
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]
