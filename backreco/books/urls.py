from django.urls import path
from .views import BookCreateView

urlpatterns = [
    path('create/', BookCreateView.as_view(), name='add books')
]
