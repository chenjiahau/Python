from django.db.models.signals import post_migrate
from django.dispatch import receiver
from core.models import Role, Privilege, TaskLevel, TaskRank


@receiver(post_migrate)
def create_default_roles(sender, **kwargs):
    default_roles = [
        {"title": "Admin"},
        {"title": "User"},
    ]

    for role_data in default_roles:
        if not Role.objects.filter(title=role_data["title"]).exists():
            Role.objects.create(**role_data)


@receiver(post_migrate)
def create_default_privileges(sender, **kwargs):
    default_privileges = [
        {"title": "Admin", "value": 1},
        {"title": "Editor", "value": 2},
        {"title": "Viewer", "value": 3},
    ]

    for privilege_data in default_privileges:
        if not Privilege.objects.filter(title=privilege_data["title"]).exists():
            Privilege.objects.create(**privilege_data)


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