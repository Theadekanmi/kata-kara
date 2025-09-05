from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_freelancer = models.BooleanField(default=False)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    title = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    skills = models.JSONField(default=list, blank=True)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    certifications = models.JSONField(default=list, blank=True)

    def __str__(self) -> str:
        return f"Profile({self.user.username})"



