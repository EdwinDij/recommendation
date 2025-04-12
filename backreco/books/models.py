from django.db import models
from users.models import CustomUser  # si tu as un modèle CustomUser
from django.utils.translation import gettext_lazy as _


class Saga(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    isbn = models.CharField(max_length=13, unique=True)
    publication_date = models.DateField(null=True, blank=True)
    saga_order = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Relations
    added_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='books_added'
    )

    saga = models.ForeignKey(
        Saga,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='books'
    )
