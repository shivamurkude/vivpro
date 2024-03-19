from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

import uuid

class MusicDetails(models.Model):
    music_id = models.CharField(max_length=100,blank=True,null=True )
    title = models.CharField(max_length=255)
    danceability = models.DecimalField(max_digits=4, decimal_places=3, validators=[MinValueValidator(0), MaxValueValidator(1)])
    energy = models.DecimalField(max_digits=11, decimal_places=10, validators=[MinValueValidator(0), MaxValueValidator(1)])
    key = models.PositiveIntegerField()
    loudness = models.DecimalField(max_digits=5, decimal_places=3, validators=[MaxValueValidator(0)])
    mode = models.BooleanField()
    acousticness = models.DecimalField(max_digits=11, decimal_places=10, validators=[MinValueValidator(0), MaxValueValidator(1)])
    instrumentalness = models.DecimalField(max_digits=11, decimal_places=10, validators=[MinValueValidator(0), MaxValueValidator(1)])
    liveness = models.DecimalField(max_digits=11, decimal_places=10, validators=[MinValueValidator(0), MaxValueValidator(1)])
    valence = models.DecimalField(max_digits=11, decimal_places=10, validators=[MinValueValidator(0), MaxValueValidator(1)])
    tempo = models.DecimalField(max_digits=6, decimal_places=3)
    duration_ms = models.PositiveIntegerField(validators=[MaxValueValidator(999999)])
    time_signature = models.PositiveIntegerField(default=4)
    num_bars = models.PositiveIntegerField()
    num_sections = models.PositiveIntegerField()
    num_segments = models.PositiveIntegerField()
    class_field = models.PositiveIntegerField(default=1)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)],default=0)
    
    
    
  
    
    def __str__(self):
        return self.title
