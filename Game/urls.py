from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path('Game/', views.Game, name="PingP"),
    # path("<str:name>", views.index_hi),
]
