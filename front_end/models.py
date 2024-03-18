from django.db import models

from django.db import models

class JournalEntry(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    dateTime = models.DateTimeField()
