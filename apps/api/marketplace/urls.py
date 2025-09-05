from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, JobViewSet, ProposalViewSet, MessageViewSet, PaymentViewSet, ReviewViewSet


router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'proposals', ProposalViewSet, basename='proposal')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'reviews', ReviewViewSet, basename='review')


urlpatterns = [
    path('', include(router.urls)),
]


