from django.utils import timezone
from core.models import CustomToken


def getToken(request):
    token = request.headers.get('Authorization').split()[1]
    exit_token = CustomToken.objects.get(key=token)

    return exit_token