from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MusicDetails
from django.http import HttpResponse
from .serializers import MusicDetailsSerializer
import csv

class MusicDetailsAPIView(APIView):
    def get(self, request):
        queryset = MusicDetails.objects.all()
        serializer = MusicDetailsSerializer(queryset, many=True)
        return Response(serializer.data)

    

    def post(self, request):
        data = request.data
    
        serializer = MusicDetailsSerializer(data=data, many=True)
        print(data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongDetailsAPIView(APIView):
    def get(self, request):
        try:
            if len(request.query_params.get('text')) == 0:
                return Response({"message": "Song not found."}, status=status.HTTP_404_NOT_FOUND)
            song = MusicDetails.objects.filter(title__contains=request.query_params.get('text'))
            if not song:
                return Response({"message": "Song not found."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = MusicDetailsSerializer(song, many=True)
            return Response(serializer.data)
            
        except MusicDetails.DoesNotExist:
            return Response({"message": "Song not found."}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        try:
            song = MusicDetails.objects.get(music_id=request.query_params.get('music_id'))
            serializer = MusicDetailsSerializer(song, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MusicDetails.DoesNotExist:
            return Response({"message": "Song not found."}, status=status.HTTP_404_NOT_FOUND)

class ExportSongsAPIView(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="music_details.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'id', 'title', 'danceability', 'energy', 'key', 'loudness', 
            'mode', 'acousticness', 'instrumentalness', 'liveness', 'valence', 
            'tempo', 'duration_ms', 'time_signature', 'num_bars', 'num_sections', 
            'num_segments', 'class_field', 'rating'
        ])

        songs = MusicDetails.objects.all()
        for song in songs:
            writer.writerow([
                song.id, song.title, song.danceability, song.energy, song.key, 
                song.loudness, song.mode, song.acousticness, song.instrumentalness, 
                song.liveness, song.valence, song.tempo, song.duration_ms, 
                song.time_signature, song.num_bars, song.num_sections, 
                song.num_segments, song.class_field, song.rating
            ])

        return response
