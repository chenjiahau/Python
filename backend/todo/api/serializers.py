from rest_framework import serializers
from todo.models import Task

class TaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    completed = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    class Meta:
        model = Task
        fields = ['id', 'title', 'completed']
        read_only_fields = ['id']