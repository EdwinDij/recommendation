from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'isbn',
            'publication_date', 'saga', 'saga_order', 'added_by', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'added_by']
