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
    # queryset = JournalEntry.objects.all()
    # serializer_class = JournalEntrySerializer

    serializer_class = JournalEntrySerializer

    def get_queryset(self):
        # Create a mock queryset using the model
        # In a real application, you'd return actual database records
        entry1 = JournalEntry(id=1, title='Entry 1', content='Content for entry 1', dateTime=now())
        entry2 = JournalEntry(id=2, title='Entry 2', content='Content for entry 2', dateTime=now())
        return [entry1, entry2]  # Return a list of model instances

    def create(self, request, *args, **kwargs):
        print(f"You tried to add '{request.data}'")
        # You can manually create a JournalEntry instance here if needed
        return Response(
            {
                "message": "Journal entry added",
                "data": request.data
            },
            status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        print(f"You tried to update entry {pk} with '{request.data}'")
        # You can manually update a JournalEntry instance here if needed
        return Response({"message": "Journal entry updated", "data": request.data}, status=status.HTTP_200_OK)
