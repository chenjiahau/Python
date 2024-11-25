from django.urls import path
from role import views


urlpatterns = [
    path('', views.RoleView.as_view(), name='role'),
    path('<uuid:pk>/', views.RoleDetailView.as_view(), name='role-detail'),
    path('create/', views.RoleCreateView.as_view(), name='role-create'),
    path('update/<uuid:pk>/', views.RoleUpdateView.as_view(), name='role-update'),
    path('delete/<uuid:pk>/', views.RoleDeleteView.as_view(), name='role-delete'),
    path('delete/all/', views.RoleDeleteAllView.as_view(), name='role-delete-all'),
]
