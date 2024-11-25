from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from core import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'first_name', 'last_name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        (
            'Permissions',
            {'fields': ('is_active', 'is_staff', 'is_superuser')}
        ),
        ('Important dates', {'fields': ('last_login',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')
        }),
    )

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Role)
admin.site.register(models.CustomToken)
admin.site.register(models.TaskLevel)
admin.site.register(models.TaskRank)
admin.site.register(models.Task)
admin.site.register(models.Review)