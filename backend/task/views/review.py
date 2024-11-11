from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.filters import OrderingFilter
from task.serializers import ReviewSerializer

from core.authentication import RequireTokenAuthentication
from core.models import Review


class ReviewView(ListAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['created_at']

    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


class ReviewDetailView(RetrieveAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_object(self):
        return Review.objects.get(id=self.kwargs['pk'])


class ReviewCreateView(CreateAPIView):
    authentication_classes = [RequireTokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)