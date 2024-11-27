from django.urls import path
from privilege import views


urlpatterns = [
    path('', views.PrivilegeView.as_view(), name='privilege'),
    path('<uuid:pk>/', views.PrivilegeDetailView.as_view(), name='privilege-detail'),
    path('create/', views.PrivilegeCreateView.as_view(), name='privilege-create'),
    path('update/<uuid:pk>/', views.PrivilegeUpdateView.as_view(), name='privilege-update'),
    path('delete/<uuid:pk>/', views.PrivilegeDeleteView.as_view(), name='privilege-delete'),
    path('delete/all/', views.PrivilegeDeleteAllView.as_view(), name='privilege-delete-all'),
]
