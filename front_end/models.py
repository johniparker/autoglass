from django.db import models

from django.db import models

class JournalEntry(models.Model):
    user_id = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    content = models.TextField()
    dateTime = models.DateTimeField()

# Always make migrations after updating this file
#
# python manage.py makemigrations
# python manage.py migrate
