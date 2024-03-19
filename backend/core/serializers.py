from rest_framework import serializers
from .models import MusicDetails

class MusicDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicDetails
        fields = '__all__'
