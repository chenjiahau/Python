from django.contrib import admin

# Register your models here.
from .models import Todo, Review, Tag

admin.site.register(Todo)
admin.site.register(Review)
admin.site.register(Tag)
