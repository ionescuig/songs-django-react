from django.shortcuts import render
from rest_framework import permissions, viewsets

from .models import Song
from .permissions import IsOwnerOrReadOnly
from .serializers import SongSerializer


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        # Your logic should be all here
        if self.request.method == 'PUT':
            self.permission_classes = [IsOwnerOrReadOnly]
        if self.request.method == 'DELETE':
            self.permission_classes = [IsOwnerOrReadOnly]
        return super(SongViewSet, self).get_permissions()
