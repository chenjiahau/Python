from rest_framework import status
from rest_framework.generics import (ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from privilege.serializers import PrivilegeSerializer
from core.authentication import RequireTokenAuthentication
from core.models import User, Privilege
from core.utils import getToken


class PrivilegeView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()


class PrivilegeDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def get_object(self):
        try:
            return Privilege.objects.get(id=self.kwargs['pk'])
        except Privilege.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PrivilegeCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def create(self, request, *args, **kwargs):
        token = getToken(request)
        user = User.objects.get(id=token.user.id)

        if not user.is_superuser:
            return Response({'message': 'You do not have permission to create privileges'}, status=status.HTTP_403_FORBIDDEN)

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()


class PrivilegeUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def update(self, request, *args, **kwargs):
        token = getToken(request)
        user = User.objects.get(id=token.user.id)

        if not user.is_superuser:
            return Response({'message': 'You do not have permission to update privileges'}, status=status.HTTP_403_FORBIDDEN)

        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
        serializer.save()

    def get_object(self):
        try:
            return Privilege.objects.get(id=self.kwargs['pk'])
        except Privilege.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PrivilegeDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def delete(self, request, *args, **kwargs):
        token = getToken(request)
        user = User.objects.get(id=token.user.id)

        if not user.is_superuser:
            return Response({'message': 'You do not have permission to delete privileges'}, status=status.HTTP_403_FORBIDDEN)

        return super().delete(request, *args, **kwargs)

    def perform_destroy(self, instance):
        instance.delete()

    def get_object(self):
        try:
            return super().get_object()
        except Privilege.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PrivilegeDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def delete(self, request, *args, **kwargs):
        token = getToken(request)
        user = User.objects.get(id=token.user.id)

        if not user.is_superuser:
            return Response({'message': 'You do not have permission to delete privileges'}, status=status.HTTP_403_FORBIDDEN)

        Privilege.objects.all().delete()
        return Response({'message': 'All privileges deleted'}, status=status.HTTP_200_OK)

    def get_object(self):
        return Privilege.objects.all()