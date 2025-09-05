from django.urls import path
from .views import MeView, RegisterView


urlpatterns = [
    path('me/', MeView.as_view(), name='accounts-me'),
    path('register/', RegisterView.as_view(), name='accounts-register'),
]


