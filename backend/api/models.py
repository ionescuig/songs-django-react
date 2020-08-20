from django.db import models


class Song(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='songs', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    link = models.URLField()

    class Meta:
        ordering = ['title', 'created']
