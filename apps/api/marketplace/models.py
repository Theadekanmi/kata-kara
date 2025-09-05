from django.conf import settings
from django.db import models


User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self) -> str:
        return self.name


class Job(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    deadline = models.DateField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    skills = models.JSONField(default=list, blank=True)
    is_open = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Job({self.title})"


class Proposal(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='proposals')
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='proposals')
    cover_letter = models.TextField()
    bid_amount = models.DecimalField(max_digits=12, decimal_places=2)
    timeframe_days = models.PositiveIntegerField(default=7)
    status = models.CharField(max_length=20, default='pending')  # pending, accepted, rejected
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'freelancer')


class Message(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField(blank=True)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Payment(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    escrow_held = models.BooleanField(default=False)
    released = models.BooleanField(default=False)
    stripe_payment_intent = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='review')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_given')
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_received')
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)



