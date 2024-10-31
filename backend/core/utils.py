from django.utils import timezone
from core.models import CustomToken


def checkTokenExpiry(request):
    if not request.headers.get('Authorization'):
        return None

    token_type = request.headers.get('Authorization').split()[0]
    if token_type != 'Bearer':
        return None
    
    token = request.headers.get('Authorization').split()[1]
    exit_token = CustomToken.objects.get(key=token)

    if exit_token.expires_at < timezone.now():
        return None

    return exit_token