from django.utils import timezone
from rest_framework import (
    status,
    generics,)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from user.serializers import (UserSerializer, AuthTokenSerializer,)
from core.authentication import RequireTokenAuthentication
from core.models import (CustomToken, User)
from core.utils import getToken


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer


class UserCreateTokenView(generics.CreateAPIView):
    serializer_class = AuthTokenSerializer

    def post (self, request):
        serializer = AuthTokenSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = CustomToken.objects.create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.id,
            'email': user.email,
            'created': token.created,
            'expires_at': token.expires_at,
        }, status=status.HTTP_200_OK)


class UserVerifyTokenExpiryView(APIView):
    serializer_class = AuthTokenSerializer

    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = getToken(request)
        if token.expires_at < timezone.now():
            return Response({'message': 'Token expired'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)


class UserTokenRevokeView(generics.GenericAPIView):
    serializer_class = AuthTokenSerializer

    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = getToken(request)
        token.delete()

        return Response({'message': 'Token revoked'}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    serializer_class = UserSerializer

    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = getToken(request)
        user = User.objects.get(id=token.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)