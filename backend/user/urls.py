from django.urls import path
from user import views


urlpatterns = [
    path('create/', views.UserCreateView.as_view(), name='create'),
]
