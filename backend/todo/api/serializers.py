from rest_framework import serializers
from todo.models import Task

class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    completed = serializers.BooleanField()

    class Meta:
        model = Task
        fields = '__all__'