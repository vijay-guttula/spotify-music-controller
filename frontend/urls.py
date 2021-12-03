from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join-room',index),
    path('create-room', index)
    
]
