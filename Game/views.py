from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(Request):
    return render(Request, 'Game/Welcome.html')

def index_hi(Request, name):
    return HttpResponse(f"Hello {name.capitalize()} !")

def Game(Request):
    return render(Request, 'Game/Game.html')