from rest_framework import serializers
from .models import Category, Job, Proposal, Message, Payment, Review


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        source='category', queryset=Category.objects.all(), write_only=True, required=False
    )

    class Meta:
        model = Job
        fields = [
            'id', 'client', 'title', 'description', 'budget', 'deadline', 'category', 'category_id', 'skills', 'is_open', 'created_at'
        ]
        read_only_fields = ['id', 'client', 'is_open', 'created_at']


class ProposalSerializer(serializers.ModelSerializer):
    freelancer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Proposal
        fields = ['id', 'job', 'freelancer', 'cover_letter', 'bid_amount', 'timeframe_days', 'status', 'created_at']
        read_only_fields = ['id', 'freelancer', 'status', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'job', 'sender', 'receiver', 'content', 'attachment', 'created_at']
        read_only_fields = ['id', 'created_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'job', 'amount', 'escrow_held', 'released', 'stripe_payment_intent', 'created_at']
        read_only_fields = ['id', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'job', 'reviewer', 'reviewee', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']



