from django.db import connection
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.filters import OrderingFilter, SearchFilter
from task.serializers import TaskSerializer, BulkTaskSerializer, TaskHasUserDetailSerializer

from core.authentication import RequireTokenAuthentication
from core.models import Task
from core.pagination import CustomTaskPagination


class TaskView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomTaskPagination

    filter_backends = [OrderingFilter]
    ordering_fields = ['title', 'created_at', 'updated_at']
    ordering = ['created_at']

    serializer_class = TaskHasUserDetailSerializer
    queryset = Task.objects.all()


class TaskSearchView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomTaskPagination

    filter_backends = [OrderingFilter, SearchFilter, DjangoFilterBackend]
    search_fields = [
        'title', 'users__first_name', 'users__last_name', 'description', 'level__title', 'rank__title',
        'created_at', 'updated_at'
    ]
    filterset_fields = {
        'is_active': ['exact'],
        'level__level': ['exact', 'lt', 'gt', 'lte', 'gte'],
        'rank__rank': ['exact', 'lt', 'gt', 'lte', 'gte'],
        'created_at': ['exact', 'lt', 'gt', 'lte', 'gte'],
        'updated_at': ['exact', 'lt', 'gt', 'lte', 'gte'],
    }
    ordering_fields = ['title', 'created_at', 'updated_at']
    ordering = ['created_at']

    serializer_class = TaskHasUserDetailSerializer
    queryset = Task.objects.all()


class TaskStatisticsView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        query = """
            SELECT
                COUNT(*) AS total_tasks,
                COUNT(CASE WHEN is_active = TRUE THEN 1 ELSE NULL END) AS active_tasks,
                COUNT(CASE WHEN is_active = FALSE THEN 1 ELSE NULL END) AS inactive_tasks,
                COUNT(CASE WHEN started_at IS NOT NULL THEN 1 ELSE NULL END) AS started_tasks,
                COUNT(CASE WHEN ended_at IS NOT NULL THEN 1 ELSE NULL END) AS ended_tasks
            FROM core_task
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            row = cursor.fetchone()

        data = {
            'total_tasks': row[0],
            'active_tasks': row[1],
            'inactive_tasks': row[2],
            'started_tasks': row[3],
            'ended_tasks': row[4],
        }

        return Response(data, status=status.HTTP_200_OK)


class TaskDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskHasUserDetailSerializer
    queryset = Task.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class BulkTaskCreateView(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = BulkTaskSerializer

    def create(self, request, *args, **kwargs):
        is_bulk = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_bulk)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class TaskUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def delete(self, request):
        Task.objects.all().delete()
        return Response({'message': 'All Tasks deleted'}, status=status.HTTP_200_OK)

    def get_object(self):
        return Task.objects.all()