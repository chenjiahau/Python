from django.utils import timezone
from rest_framework import (
    status,
    generics,)
from rest_framework.response import Response
from rest_framework.views import APIView

from user.serializers import (UserSerializer, AuthTokenSerializer,)
from core.models import (CustomToken, User)
from core.utils import checkTokenExpiry


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

    def get(self, request):
        try:
            # Get the token from the header
            token_type = request.META.get('HTTP_AUTHORIZATION').split()[0]
            if token_type != 'Bearer':
                return Response({'message': 'Invalid token type'}, status=status.HTTP_400_BAD_REQUEST)

            token = request.META.get('HTTP_AUTHORIZATION').split()[1]
            exit_token = CustomToken.objects.get(key=token)

            if exit_token.expires_at < timezone.now():
                return Response({'message': 'Token expired'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)
        except CustomToken.DoesNotExist:
            return Response({'message': 'Token not found'}, status=status.HTTP_404_NOT_FOUND)

    # serializer_class = TokenExpirySerializer
    # queryset = TokenExpiry.objects.all()
    # lookup_field = 'token'
    # lookup_url_kwarg = 'token'

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if instance.expiry < timezone.now():
    #         Token.objects.get(key=instance.token).delete()
    #         instance.delete()
    #         return Response({'message': 'Token expired'}, status=status.HTTP_400_BAD_REQUEST)

    #     return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)


class UserTokenRevokeView(generics.GenericAPIView):
    serializer_class = AuthTokenSerializer

    def post(self, request):
        exit_token = checkTokenExpiry(request)
        if not exit_token:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        exit_token.delete()
        return Response({'message': 'Token revoked'}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        exit_token = checkTokenExpiry(request)
        if not exit_token:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.get(id=exit_token.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)