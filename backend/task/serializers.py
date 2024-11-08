from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from rest_framework import serializers
from core.models import TaskLevel, TaskRank


class TaskLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLevel
        fields = ['id', 'title', 'level']


class TaskRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskRank
        fields = ['id', 'title', 'rank']