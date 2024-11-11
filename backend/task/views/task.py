from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.filters import OrderingFilter
from task.serializers import TaskSerializer, TaskHasUserDetailSerializer

from core.authentication import RequireTokenAuthentication
from core.models import Task


class TaskView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
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
        return Task.objects.get(id=self.kwargs['pk'])


class TaskCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_object(self):
        return Task.objects.get(id=self.kwargs['pk'])


class TaskDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_object(self):
        return Task.objects.get(id=self.kwargs['pk'])


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