from rest_framework import status
from rest_framework.generics import (ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from role.serializers import RoleSerializer
from core.authentication import RequireTokenAuthentication
from core.models import Role


class RoleView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()


class RoleDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def get_object(self):
        try:
            return Role.objects.get(id=self.kwargs['pk'])
        except Role.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RoleCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()


class RoleUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def get_object(self):
        try:
            return Role.objects.get(id=self.kwargs['pk'])
        except Role.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RoleDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except Role.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RoleDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoleSerializer
    queryset = Role.objects.all()

    def delete(self, request):
        Role.objects.all().delete()
        return Response({'message': 'All Roles deleted'}, status=status.HTTP_200_OK)

    def get_object(self):
        return Role.objects.all()