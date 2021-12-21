from django.shortcuts import render, redirect
from rest_framework import response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from requests import Request, post, get
from .utils import *
from api.models import Room

import environ
env = environ.Env()
environ.Env.read_env()

# Create your views here.

class AuthURL(APIView):
  def get(self, request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control playlist-read-private playlist-modify-public user-read-playback-position user-top-read user-read-recently-played'
    
    url = Request('GET','https://accounts.spotify.com/authorize', params={
      'scope': scopes,
      'response_type':'code',
      'redirect_uri': env('REDIRECT_URI'),
      'client_id': env('CLIENT_ID'),
    }).prepare().url
    
    return Response({'status': 'success','url' : url}, status=status.HTTP_200_OK)
  

def spotify_callback (request, format=None):
  code = request.GET.get('code')
  error = request.GET.get('error')
  
  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type':'authorization_code',
    'code' : code,
    'redirect_uri' : env('REDIRECT_URI'),
    'client_id' : env('CLIENT_ID'),
    'client_secret' : env('CLIENT_SECRET')
  }).json()
  
  access_token = response.get('access_token')
  token_type = response.get('token_type')
  refresh_token = response.get('refresh_token')
  expires_in = response.get('expires_in')
  error = response.get('error')
  
  if not request.session.exists(request.session.session_key):
    request.session.create()
  
  update_or_create_user_tokens(request.session.session_key, access_token, token_type,expires_in,refresh_token)
  
  return redirect('frontend:')

class IsAuthenticated(APIView):
  def get(self, request, format=None):
    is_authenticated = is_spotify_authenticated(self.request.session.session_key)
    return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
  
  

class CurrentPlayback(APIView):
  def get(self, request, format=None):
    room_code = self.request.session.get('room_code')
    room = Room.objects.filter(code=room_code)[0]
    host = room.host
    endpoint = 'player/currently-playing'
    
    response = execute_spotify_api_request(host, endpoint)
    
    if 'error' in response or 'item' not in response:
      return Response({'message':'spotify server error'}, status=status.HTTP_204_NO_CONTENT)
    
    item = response.get('item')
    duration = item.get('duration_ms')
    progress = response.get('progress_ms')
    album_cover = item.get('album').get('images')[0].get('url')
    is_playing = response.get('is_playing')
    song_id = item.get('id')
    
    artists_names = ''
    
    for i, artist in enumerate(item.get('artists')):
      artists_names += artist.get('name')
      if i != (len(item.get('artists')) - 1):
        artists_names += ', '
        
    # print(artists_names)
    
    song = {
      'id': song_id,
      'title' : item.get('name'),
      'artist': artists_names,
      'duration': duration,
      'time': progress,
      'image_url': album_cover,
      'is_playing': is_playing,
    }
      
    
    return Response({'status':'success', 'data':song}, status=status.HTTP_200_OK)


