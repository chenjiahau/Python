import secrets
from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from rest_framework import serializers
from role.serializers import RoleSerializer
from core.models import Role


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), write_only=True, source='role')

    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'password', 'role', 'role_id')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8, 'max_length': 32}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

    def delete(self, instance):
        instance.delete()


def generate_token_key(length=40):
    return secrets.token_hex(length // 2)

class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise serializers.ValidationError(msg, code='authentication')
        attrs['key'] = generate_token_key()
        attrs['user'] = user

        return attrs