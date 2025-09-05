from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Job, Proposal, Message, Payment, Review
from .serializers import (
    CategorySerializer,
    JobSerializer,
    ProposalSerializer,
    MessageSerializer,
    PaymentSerializer,
    ReviewSerializer,
)


class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'is_client', False))


class IsFreelancer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'is_freelancer', False))


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'skills']

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsClient])
    def close(self, request, pk=None):
        job = self.get_object()
        job.is_open = False
        job.save()
        return Response({'status': 'closed'})


class ProposalViewSet(viewsets.ModelViewSet):
    queryset = Proposal.objects.select_related('job').order_by('-created_at')
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user, status='pending')


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-created_at')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)


