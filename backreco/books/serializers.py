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

    def validate(self, data):
        request = self.context.get('request')
        user = request.user if request else None

        title = data.get('title')
        author = data.get('author')

        if Book.objects.filter(title__iexact=title, author__iexact=author, added_by=user).exists():
            raise serializers.ValidationError(
                "Tu as déjà ajouté ce livre avec cet auteur."
            )
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['added_by'] = user
        return super().create(validated_data)