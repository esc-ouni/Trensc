from django.urls import path
from . import views

urlpatterns = [
    path("",     views.get_btc),   
    # path("mad/", views.get_btc_price_mad),
    path('mad/', views.get_btc_price_mad, name='btc_price'),
    path('btc-price-json/', views.get_btc_price_mad_json, name='btc_price_json'),
]