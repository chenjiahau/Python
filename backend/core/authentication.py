from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone
from core.models import (CustomToken, User)


# Custom token authentication for Swagger UI
class CustomTokenAuthentication(BaseAuthentication):
    model = CustomToken

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token_key = auth_header.split(' ')[1]
        return self.authenticate_credentials(token_key)

    def authenticate_credentials(self, key):
        try:
            token = self.model.objects.get(key=key)
        except self.model.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')

        if token.expires_at and token.expires_at < timezone.now():
            raise AuthenticationFailed('Token has expired.')

        return (token.user, token)


# Custom token authentication for API
class RequireTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')

        if not token:
            raise AuthenticationFailed("Token is required in the Authorization header.")

        token_type = request.headers.get('Authorization').split()[0]
        if token_type != 'Bearer':
            raise AuthenticationFailed("Invalid token type")

        token = request.headers.get('Authorization').split()[1]

        try:
            exit_token = CustomToken.objects.get(key=token)

            if exit_token.expires_at < timezone.now():
                raise AuthenticationFailed("Token expired")

            try:
                user = User.objects.get(id=exit_token.user_id)
            except User.DoesNotExist:
                raise AuthenticationFailed("Invalid token")

            return (user, token)
        except CustomToken.DoesNotExist:
            raise AuthenticationFailed("Invalid token")