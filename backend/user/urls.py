from django.urls import path
from user import views


urlpatterns = [
    path('create/', views.UserCreateView.as_view(), name='create'),
    path('delete/', views.UserDeleteView.as_view(), name='delete'),
    path('token/', views.UserCreateTokenView.as_view(), name='token'),
    path('token/verify/', views.UserVerifyTokenExpiryView.as_view(), name='token-verify'),
    path('token/revoke/', views.UserTokenRevokeView.as_view(), name='token-revoke'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
]
