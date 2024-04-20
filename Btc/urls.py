from django.urls import path
from . import views

urlpatterns = [
    path("",     views.get_btc),   
    path("mad/", views.get_btc_price_mad),   
]