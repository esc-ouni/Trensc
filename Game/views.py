from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(Request):
    return HttpResponse("Hello !")

def index_hi(Request, name):
    return HttpResponse(f"Hello {name.capitalize()} !")

def Game(Request):
    return render(Request, 'Game/Game.html')