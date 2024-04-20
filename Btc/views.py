from django.shortcuts import render
import requests


def get_btc(request):
    return render(request, "Btc/Btc.html")


def get_btc_price_mad(request):
    url = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
    response = requests.get(url)
    data = response.json()
    rate = str(round(float(data['data']['rates']['MAD']), 2))

    context = {'btc_to_mad': rate,
               'low_24h': str(round(float(rate) - 770.17, 2)),
               'high_24h': str(round(float(rate) + 860.37, 2)),
               'change_percentage': 15}
    return render(request, 'Btc/btc_price.html', context)