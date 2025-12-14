# api/models.py

from django.db import models
from django.db.models import F
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from pgvector.django import VectorField, HnswIndex
import uuid


class SubscriptionTier(models.Model):
    """
    Model to define subscription tiers and their limits
    """
    TIER_CHOICES = [
        ('free', 'Free'),
        ('basic', 'Basic'),
        ('premium', 'Premium'),
    ]
    
    name = models.CharField(max_length=20, choices=TIER_CHOICES, unique=True)
    display_name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_translation_limit = models.IntegerField()
    daily_translation_limit = models.IntegerField()
    features = models.JSONField(default=list)  # List of features for this tier
    
    def __str__(self):
        return self.display_name

class User(AbstractUser):
    """
    Extends Django's built-in User model to add relationships for
    known and learning words and subscription information.
    """
    name = models.CharField(max_length=255, blank=True)

    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    embedding = VectorField(dimensions=768, null=True, blank=True)

    interest = models.JSONField(

        null=True,
    )

    # Subscription fields
    subscription_tier = models.ForeignKey(
        SubscriptionTier, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        default=None
    )

    subscription_start_date = models.DateTimeField(null=True, blank=True)
    subscription_end_date = models.DateTimeField(null=True, blank=True)
    is_subscription_active = models.BooleanField(default=False)
    
    # Usage tracking
    monthly_translations_used = models.IntegerField(default=0)
    daily_translations_used = models.IntegerField(default=0)
    last_translation_date = models.DateField(null=True, blank=True)
    last_monthly_reset = models.DateField(null=True, blank=True)

    indexes = [
        # Create an HNSW index for cosine distance ('opclasses': ['vector_cosine_ops'])
        HnswIndex(
            name='user_embedding_index',
            fields=['embedding'],
            m=16,
            ef_construction=64,
            opclasses=['vector_cosine_ops']
        )
    ]


    def reset_usage_counters_if_needed(self):
        """
        Atomically checks and resets usage counters if a new day or month has begun.
        This should be called before checking limits.
        """
        today = timezone.now().date()
        
        # Reset daily counter if it's a new day
        if self.last_translation_date != today:
            self.daily_translations_used = 0
            self.last_translation_date = today

        # Reset monthly counter if it's a new month
        if not self.last_monthly_reset or self.last_monthly_reset.month != today.month:
            self.monthly_translations_used = 0
            self.last_monthly_reset = today
        
        # Note: We don't call self.save() here. 
        # The save will happen when usage is incremented.

    
    def get_current_tier(self):
        """Get the current subscription tier or return free tier"""
        if self.subscription_tier and self.is_subscription_active:
            return self.subscription_tier
        else:
            # Return free tier
            free_tier, created = SubscriptionTier.objects.get_or_create(
                name='free',
                defaults={
                    'display_name': 'Free',
                    'price': 0,
                    'monthly_translation_limit': 150,
                    'daily_translation_limit': 5,
                    'features': ['Basic translation', 'Limited vocabulary tracking']
                }
            )
            return free_tier


class PaymentTransaction(models.Model):
    """
    Model to store PayPal payment transactions
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription_tier = models.ForeignKey(SubscriptionTier, on_delete=models.CASCADE)
    
    # PayPal specific fields
    paypal_order_id = models.CharField(max_length=255, unique=True)
    paypal_capture_id = models.CharField(max_length=255, blank=True, null=True)
    paypal_payer_id = models.CharField(max_length=255, blank=True, null=True)
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Payment verification
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Payment {self.paypal_order_id} - {self.user.email} - {self.amount} {self.currency}"
    

class ChatSession(models.Model):
    """
    Represents a single conversation session.
    Groups multiple ChatMemory messages together.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_sessions")
    
    # Metadata for the session
    started_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, blank=True, default="New Conversation")

    def __str__(self):
        return f"Session {self.id} - {self.started_at.strftime('%Y-%m-%d')}"


class ChatMemory(models.Model):
    """
    Individual messages within a specific session.
    """
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('error', 'Error'),
    ]

    # LINK TO SESSION INSTEAD OF USER/PROJECT DIRECTLY
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name="messages", null=True)
    
    item_id = models.CharField(max_length=100, unique=True, null=True)
    message = models.TextField(null=True)
    is_ai = models.BooleanField(default=False, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        ordering = ['created_at']

    