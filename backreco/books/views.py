from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView

from django.contrib.auth import get_user_model

from .models import Book
from .serializers import BookSerializer

class BookCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'livre ajouté'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyBookDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        # Si un pk est fourni, on cherche un seul livre
        if pk:
            try:
                book = Book.objects.get(id=pk, added_by=request.user)
                serializer = BookSerializer(book)
                # Retourne un statut valide
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Book.DoesNotExist:
                return Response({"detail": "Livre non trouvé ou non ajouté par cet utilisateur."}, status=status.HTTP_404_NOT_FOUND)

        books = Book.objects.filter(added_by=request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            # Vérifier si le livre appartient à l'utilisateur connecté
            book = Book.objects.get(id=pk, added_by=request.user)
            book.delete()  # Supprimer le livre
            return Response({"detail": "Livre supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
        except Book.DoesNotExist:
            return Response({"detail": "Livre non trouvé ou non ajouté par cet utilisateur."}, status=status.HTTP_404_NOT_FOUND)
