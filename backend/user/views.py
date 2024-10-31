from rest_framework import (
    generics,
    authentication,
    permissions,)
from rest_framework.authtoken.views import ObtainAuthToken
from user.serializers import (
    UserSerializer,
    AuthTokenSerializer,
)


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer


class UserCreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user