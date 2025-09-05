from django.contrib import admin
from .models import User, Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ("username", "email", "is_client", "is_freelancer", "is_staff")
	search_fields = ("username", "email")
	list_filter = ("is_client", "is_freelancer", "is_staff", "is_superuser")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
	list_display = ("user", "title", "hourly_rate", "rating")
	search_fields = ("user__username", "title")
	list_filter = ("hourly_rate",)

