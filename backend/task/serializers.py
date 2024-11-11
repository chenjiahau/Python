from django.contrib.auth import get_user_model
from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from rest_framework import serializers
from core.models import User, TaskLevel, TaskRank, Task, Review

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


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'task', 'content', 'point']

    def validate(self, data):
        # Check task is active
        if not data['task'].is_active:
            raise serializers.ValidationError("You can't review an inactive task.")

        # Check if the point is between 1 and 5
        if data['point'] < 1 or data['point'] > 5:
            raise serializers.ValidationError("The point should be between 1 and 5.")

        # Check if the user has already reviewed the task
        user = self.context['request'].user
        task = data['task']

        if task.reviews.filter(user=user).exists():
            raise serializers.ValidationError("You have already reviewed this task.")

        return data