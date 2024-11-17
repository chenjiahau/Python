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
    # Task
    path('', views.TaskView.as_view(), name='task'),
    path('search/', views.TaskSearchView.as_view(), name='task-search'),
    path('<uuid:pk>/', views.TaskDetailView.as_view(), name='task-detail'),
    path('create/', views.TaskCreateView.as_view(), name='task-create'),
    path('bulk-create/', views.BulkTaskCreateView.as_view(), name='bulk-task-create'),
    path('update/<uuid:pk>/', views.TaskUpdateView.as_view(), name='task-update'),
    path('delete/<uuid:pk>/', views.TaskDeleteView.as_view(), name='task-delete'),
    path('delete/all/', views.TaskDeleteAllView.as_view(), name='task-delete-all'),
    # Review
    path('review/', views.ReviewView.as_view(), name='review'),
    path('review/<uuid:pk>/', views.ReviewDetailView.as_view(), name='review-detail'),
    path('review/create/', views.ReviewCreateView.as_view(), name='review-create'),
]
