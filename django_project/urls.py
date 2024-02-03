from django.contrib import admin
from django.urls import path
from django.conf import settings
from front_end.views import index, add_numbers
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/add/', add_numbers, name='add_numbers'),
    path('', include('front_end.urls')),
]
