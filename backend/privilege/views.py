from rest_framework import status
from rest_framework.generics import (ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from privilege.serializers import PrivilegeSerializer
from core.authentication import RequireTokenAuthentication
from core.permission import HasPrivilegePermission
from core.models import Privilege


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
    permission_classes = [IsAuthenticated, HasPrivilegePermission]
    required_privileges = [1, 2]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()


class PrivilegeUpdateView(UpdateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated, HasPrivilegePermission]
    required_privileges = [1, 2]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def get_object(self):
        try:
            return Privilege.objects.get(id=self.kwargs['pk'])
        except Privilege.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PrivilegeDeleteView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated, HasPrivilegePermission]
    required_privileges = [1, 2]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def get_object(self):
        try:
            return super().get_object()
        except Privilege.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PrivilegeDeleteAllView(DestroyAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated, HasPrivilegePermission]
    required_privileges = [1, 2]

    serializer_class = PrivilegeSerializer
    queryset = Privilege.objects.all()

    def get_object(self):
        return Privilege.objects.all()