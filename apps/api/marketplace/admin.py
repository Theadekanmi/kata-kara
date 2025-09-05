from django.contrib import admin
from .models import Category, Job, Proposal, Message, Payment, Review


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	search_fields = ("name",)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
	list_display = ("title", "client", "budget", "is_open", "created_at")
	search_fields = ("title", "client__username")
	list_filter = ("is_open", "created_at")


@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
	list_display = ("job", "freelancer", "bid_amount", "status", "created_at")
	search_fields = ("job__title", "freelancer__username")
	list_filter = ("status",)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
	list_display = ("job", "sender", "receiver", "created_at")
	search_fields = ("job__title", "sender__username", "receiver__username")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
	list_display = ("job", "amount", "escrow_held", "released", "created_at")
	list_filter = ("escrow_held", "released")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
	list_display = ("job", "reviewer", "reviewee", "rating", "created_at")
	list_filter = ("rating",)

