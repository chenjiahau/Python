from django.db.models.signals import post_migrate
from django.dispatch import receiver
from core.models import User, TaskLevel, TaskRank

@receiver(post_migrate)
def create_default_user(sender, **kwargs):
    default_users = [
        {"email": "testuser1@todo.com", "first_name": "Test", "last_name": "User1", "is_staff": True, "is_superuser": False},
        {"email": "testuser2@todo.com", "first_name": "Test", "last_name": "User2", "is_staff": True, "is_superuser": False},
    ]

    for user_data in default_users:
        if not User.objects.filter(email=user_data["email"]).exists():
            User.objects.create_user(**user_data)


@receiver(post_migrate)
def create_default_task_levels(sender, **kwargs):
    default_levels = [
        {"title": "Low", "level": 1},
        {"title": "Middle", "level": 2},
        {"title": "High", "level": 3},
    ]

    for level_data in default_levels:
        if not TaskLevel.objects.filter(level=level_data["level"]).exists():
            TaskLevel.objects.create(**level_data)


@receiver(post_migrate)
def create_default_task_ranks(sender, **kwargs):
    default_ranks = [
        {"title": "Normal", "rank": 1},
        {"title": "Better", "rank": 2},
        {"title": "Good", "rank": 3},
    ]

    for rank_data in default_ranks:
        if not TaskRank.objects.filter(rank=rank_data["rank"]).exists():
            TaskRank.objects.create(**rank_data)