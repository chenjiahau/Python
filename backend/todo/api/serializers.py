from rest_framework import serializers
from todo.models import Task
from django.utils import timezone

class TaskSerializer(serializers.ModelSerializer):
    # Define the fields that should be serialized
    # If default values are not provided, the fields are required
    id = serializers.UUIDField(format='hex_verbose', read_only=True)
    title = serializers.CharField()
    level = serializers.IntegerField()
    started_at = serializers.DateTimeField()
    enabled = serializers.BooleanField(default=True)
    completed = serializers.BooleanField(default=False)

    # The create method is used to create a new task
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    # The update method is used to update an existing task
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.level = validated_data.get('level', instance.level)
        instance.started_at = validated_data.get('started_at', instance.started_at)
        instance.enabled = validated_data.get('enabled', instance.enabled)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.updated_at = timezone.now()
        instance.save()

        return instance

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['id']

        # id field is read-only, so it is not included in the fields list
        # fields = '__all__' can be used to include all fields

    def validate_title(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('Title must be at least 3 characters long')

        return value

    def validate_level(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError('Level must be between 1 and 5')

        return value

    def validate_started_at(self, value):
        if value < timezone.now():
            raise serializers.ValidationError('Started at must be in the future')

        return value

    def validate(self, data):
        if data['completed'] and not data['enabled']:
            raise serializers.ValidationError('Task cannot be completed if it is not enabled')

        return data