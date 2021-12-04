from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer


class CreateRoomView(APIView):
  serializer_class = CreateRoomSerializer
  
  def post(self, request, format=None):
    pass