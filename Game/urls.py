from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("<str:name>", views.index_hi),
    path('Game/', views.Game, name="PingP")
]
