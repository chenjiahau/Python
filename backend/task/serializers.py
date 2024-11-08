from django.contrib.auth import get_user_model
from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from rest_framework import serializers
from core.models import User, TaskLevel, TaskRank, Task

User = get_user_model()


class TaskLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLevel
        fields = ['id', 'title', 'level']


class TaskRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskRank
        fields = ['id', 'title', 'rank']


class TaskSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_active=True), many=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'users', 'description', 'level', 'rank', "started_at", "ended_at"]

    def validate_users(self, value):
        inactive_users = [user for user in value if not user.is_active]
        if inactive_users:
            raise serializers.ValidationError("Only active users can be assigned to a task.")

        return value