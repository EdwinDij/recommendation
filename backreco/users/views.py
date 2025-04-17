from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from django.contrib.auth import get_user_model

from .serializers import UserSerializer, RegisterSerializer, DeleteAccountSerializer

User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed as e:
            return Response({"message": "Identifiants incorrects"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "message": "Connexion réussie",
            "token": serializer.validated_data,
        }, status=status.HTTP_200_OK)


def revoke_user_tokens(user):
    tokens = OutstandingToken.objects.filter(user=user)

    for token in tokens:
        try:
            # Convertir l'OutstandingToken en RefreshToken
            token_instance = RefreshToken(token.token)
            token_instance.blacklist()
        except Exception as e:
            # Token déjà blacklisté ou invalide, on ignore
            continue

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(
            request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profil mis à jour avec succès', 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        serializer = DeleteAccountSerializer(
            data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        if user.books_added.exists():
            user.books_added.all().delete()
            message = 'Compte et livres associés supprimés avec succès'
        else:
            message = 'Compte supprimé avec succès (aucun livre associé)'

        # Révocation des tokens (sécurité)
        revoke_user_tokens(user)

        # Suppression du compte
        user.delete()

        return Response({'message': message}, status=status.HTTP_204_NO_CONTENT)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
