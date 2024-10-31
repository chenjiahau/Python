from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from user.serializers import (
    UserSerializer,
    AuthTokenSerializer,
)


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer


class UserCreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer