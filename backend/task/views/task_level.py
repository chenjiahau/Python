from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from task.serializers import TaskLevelSerializer

from core.authentication import RequireTokenAuthentication
from core.models import TaskLevel


class TaskLevelView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()


class TaskLevelDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()

    def get_object(self):
        instance = TaskLevel.objects.get(id=self.kwargs['pk'])

        return {
            'id': instance.id,
            'title': instance.title,
            'level': instance.level,
        }


class TaskLevelCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()


class TaskLevelUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()

    def get_object(self):
        return TaskLevel.objects.get(id=self.kwargs['pk'])


class TaskLevelDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()

    def get_object(self):
        return TaskLevel.objects.get(id=self.kwargs['pk'])


class TaskLevelDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskLevelSerializer
    queryset = TaskLevel.objects.all()

    def delete(self, request):
        TaskLevel.objects.all().delete()
        return Response({'message': 'All Task Levels deleted'}, status=status.HTTP_200_OK)

    def get_object(self):
        return TaskLevel.objects.all()