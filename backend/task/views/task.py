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

    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = [
        'title', 'users__first_name', 'users__last_name', 'description', 'level__title', 'rank__title',
        'created_at', 'updated_at'
    ]
    ordering_fields = ['title', 'created_at', 'updated_at']
    ordering = ['created_at']

    serializer_class = TaskHasUserDetailSerializer
    queryset = Task.objects.all()


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