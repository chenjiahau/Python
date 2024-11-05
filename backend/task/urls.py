from django.urls import path
from task import views


urlpatterns = [
    path('task-level/', views.TaskLevelView.as_view(), name='task-level'),
    path('task-level/<uuid:pk>/', views.TaskLevelDetailView.as_view(), name='task-level-detail'),
    path('task-level/create/', views.TaskLevelCreateView.as_view(), name='task-level-create'),
    path('task-level/update/<uuid:pk>/', views.TaskLevelUpdateView.as_view(), name='task-level-update'),
    path('task-level/delete/<uuid:pk>/', views.TaskLevelDeleteView.as_view(), name='task-level-delete'),
    path('task-level/delete/all/', views.TaskLevelDeleteAllView.as_view(), name='task-level-delete-all'),
]
