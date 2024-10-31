from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils import timezone
from core.models import CustomToken


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