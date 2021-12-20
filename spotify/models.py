from django.db import models

# Create your models here.
class SpotityToken (models.Model):
  user = models.CharField(max_length=50, unique=True) #session_id
  created_at = models.DateTimeField(auto_now_add=True)
  refresh_token = models.CharField(max_length=150)
  access_token = models.CharField(max_length=150)
  expires_in = models.DateTimeField()
  token_type = models.CharField(max_length=50)