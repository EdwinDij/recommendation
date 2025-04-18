from django.urls import path
from .views import BookCreateView, MyBookDetailView

urlpatterns = [
    path('create/', BookCreateView.as_view(), name='add books'),
    path('book/', MyBookDetailView.as_view(), name='my books'),
    path('book/<int:pk>/', MyBookDetailView.as_view(), name='my book detail'),
    path('book/<int:pk>/delete/', MyBookDetailView.as_view(), name='book-delete'),


]
