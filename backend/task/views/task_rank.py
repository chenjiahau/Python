from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from task.serializers import TaskRankSerializer

from core.authentication import RequireTokenAuthentication
from core.models import TaskRank


class TaskRankView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()


class TaskRankDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()

    def get_object(self):
        instance = TaskRank.objects.get(id=self.kwargs['pk'])

        return {
            'id': instance.id,
            'title': instance.title,
            'rank': instance.rank,
        }


class TaskRankCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()


class TaskRankUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except TaskRank.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskRankDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except TaskRank.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskRankDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = TaskRankSerializer
    queryset = TaskRank.objects.all()

    def delete(self, request):
        TaskRank.objects.all().delete()
        return Response({'message': 'All Task Ranks deleted'}, status=status.HTTP_200_OK)

    def get_object(self):
        return TaskRank.objects.all()