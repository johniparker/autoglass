import posixpath
import os
from pathlib import Path
from django.http import Http404, HttpResponseServerError
from django.utils._os import safe_join
from django.views.static import serve as static_serve
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
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


class TokenPresent(BasePermission):
    # Allows access only if a token is present in the headers.
    def has_permission(self, request, view):
        return 'Authorization' in request.headers

class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    # Use custom permission class or remove it entirely if not needed
    permission_classes = [TokenPresent]

    def get_queryset(self):
        # Get the user ID from a custom header or part of the request
        user_id = self.request.headers.get('X-User-ID')
        return JournalEntry.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        # Get the user ID from the request data and save it with the journal entry
        user_id = self.request.data.get('user_id')
        serializer.save(user_id=user_id)

    # No need to override `create` and `update` methods if they don't have specific logic other than calling `perform_create` and `perform_update`

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Ensure the instance user_id matches the one in the request data or headers
        request_user_id = request.data.get('user_id') or request.headers.get('X-User-ID')
        if instance.user_id != request_user_id:
            return Response({"detail": "You do not have permission to update this entry."}, status=status.HTTP_403_FORBIDDEN)

        return super(JournalEntryViewSet, self).update(request, *args, **kwargs)