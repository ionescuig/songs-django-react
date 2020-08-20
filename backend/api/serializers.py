from rest_framework import serializers
from .models import Song


class SongSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Song
        fields = '__all__'
