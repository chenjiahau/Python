from django.urls import path
from user import views


urlpatterns = [
    path('create/', views.UserCreateView.as_view(), name='create'),
    path('token/', views.UserCreateTokenView.as_view(), name='token'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
]
