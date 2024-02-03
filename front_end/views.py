from django.shortcuts import render
import os
from pathlib import Path
from django.http import JsonResponse
# Create your views here.


def index(request):
    return render(request, 'front_end/index.html')


def add_numbers(request):
    # Extract numbers from the request's query parameters
    number1 = request.GET.get('number1', 0)
    number2 = request.GET.get('number2', 0)

    # Convert numbers to integers and add them
    result = int(number1) + int(number2)

    # Return the result as JSON
    return JsonResponse({'result': result})
