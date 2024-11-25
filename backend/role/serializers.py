from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from rest_framework import serializers
from core.models import Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'title')