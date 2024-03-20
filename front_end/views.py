import posixpath
import os
from pathlib import Path
from django.http import Http404, HttpResponseServerError
from django.utils._os import safe_join
from django.views.static import serve as static_serve
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.utils.timezone import now

from .models import JournalEntry
from .serializers import JournalEntrySerializer

def serve_react(request, path='', document_root=None):
    if not document_root or not os.path.isdir(document_root):
        return HttpResponseServerError("Server configuration error.")

    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))

    if fullpath.is_file():
        return static_serve(request, path, document_root=document_root)
    else:
        index_path = Path(safe_join(document_root, "index.html"))
        if not index_path.is_file():
            return Http404("index.html not found.")

        return static_serve(request, "index.html", document_root=document_root)


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
