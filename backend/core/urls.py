from django.urls import path
from .views import MusicDetailsAPIView,SongDetailsAPIView,ExportSongsAPIView

urlpatterns = [
    path('music/', MusicDetailsAPIView.as_view(), name='music-details-api'),
    path('song/', SongDetailsAPIView.as_view(), name='music-details-api'),
    path('export/', ExportSongsAPIView.as_view(), name='export-songs'),
]
