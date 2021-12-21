from datetime import timedelta
from requests import post, put
import requests
from requests.sessions import session
from .models import SpotityToken
from django.utils import timezone
from datetime import timedelta

BASE_URL = 'https://api.spotify.com/v1/me/'

import environ
env = environ.Env()
environ.Env.read_env()

def get_user_tokens(session_id):
  user_tokens = SpotityToken.objects.filter(user=session_id)
  if user_tokens.exists():
    return user_tokens[0]
  return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
  tokens = get_user_tokens(session_id)
  print(session_id)
  print(tokens)
  print(timedelta(seconds=expires_in))
  expires_in = timezone.now() + timedelta(seconds=expires_in)
  
  if tokens:
    tokens.access_token = access_token
    tokens.refresh_token = refresh_token
    tokens.expires_in = expires_in
    tokens.token_type = token_type
    tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
  else:
    tokens = SpotityToken(user=session_id, access_token=access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
    tokens.save()
    

def is_spotify_authenticated(session_id):
  tokens = get_user_tokens(session_id)
  if tokens:
    expiry = tokens.expires_in
    if expiry <= timezone.now():
      refresh_spotify_token(session_id)
    
    return True
  
  return False
      
def refresh_spotify_token(session_id):
  refresh_token = get_user_tokens(session_id).refresh_token
  
  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type':'refresh_token',
    'refresh_token' : 'refresh_token',
    'client_id': env('CLIENT_ID'),
    'client_secret': env('CLIENT_SECRET')
  }).json()
  
  access_token = response.get('access_token')
  token_type = response.get('token_type')
  expires_in = response.get('expires_in')
  refresh_token = response.get('refresh_token')
  
  update_or_create_user_tokens(session_id=session_id, access_token=access_token, token_type=token_type, expires_in=expires_in, refresh_token=refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
  tokens = get_user_tokens(session_id)
  headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}
  
  if post_:
    post(BASE_URL + endpoint, headers=headers)
  if put_:
    put(BASE_URL + endpoint, headers=headers)

  response = requests.get(BASE_URL + endpoint, {}, headers=headers)
  try:
    return response.json()
  except:
    return {'Error': 'Issue with request'}
  
  
  