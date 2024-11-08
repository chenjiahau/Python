from django.urls import path
from task import views


urlpatterns = [
    # Task Level
    path('task-level/', views.TaskLevelView.as_view(), name='task-level'),
    path('task-level/<uuid:pk>/', views.TaskLevelDetailView.as_view(), name='task-level-detail'),
    path('task-level/create/', views.TaskLevelCreateView.as_view(), name='task-level-create'),
    path('task-level/update/<uuid:pk>/', views.TaskLevelUpdateView.as_view(), name='task-level-update'),
    path('task-level/delete/<uuid:pk>/', views.TaskLevelDeleteView.as_view(), name='task-level-delete'),
    path('task-level/delete/all/', views.TaskLevelDeleteAllView.as_view(), name='task-level-delete-all'),
    # Task Rank
    path('task-rank/', views.TaskRankView.as_view(), name='task-rank'),
    path('task-rank/<uuid:pk>/', views.TaskRankDetailView.as_view(), name='task-rank-detail'),
    path('task-rank/create/', views.TaskRankCreateView.as_view(), name='task-rank-create'),
    path('task-rank/update/<uuid:pk>/', views.TaskRankUpdateView.as_view(), name='task-rank-update'),
    path('task-rank/delete/<uuid:pk>/', views.TaskRankDeleteView.as_view(), name='task-rank-delete'),
    path('task-rank/delete/all/', views.TaskRankDeleteAllView.as_view(), name='task-rank-delete-all'),
]
