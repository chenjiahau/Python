from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid

# Create your models here.
class TaskLevel(models.IntegerChoices):
    VERY_LOW = 1
    LOW = 2
    MEDIUM = 3
    HIGH = 4
    VERY_HIGH = 5

    def __str__(self):
        return self.name

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    level = models.IntegerField(choices=TaskLevel.choices, default=TaskLevel.MEDIUM)
    started_at = models.DateTimeField(default=timezone.now)
    enabled = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title