from django.urls import path
from todo.api.views import TaskList, TaskDetail

urlpatterns = [
    path('', TaskList.as_view(), name='index'),
    path('<uuid:pk>/', TaskDetail.as_view(), name='task_detail'),
]