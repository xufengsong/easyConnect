# api/urls.py
from django.urls import path
from django.urls import re_path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
    path('register/', views.register, name='register'),
    path('user_profile_view/', views.user_profile_view, name='user_profile_view'),
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
    path('get-ws-token/', views.get_ws_token, name='get_ws_token'),
    path('get-voice-token/', views.get_voice_token, name="get_voice_token"),
    path('chat/', views.chat_response, name='chat_response'),
    path('save-chat-memory/', views.save_chat_memory, name='save_chat_memory'),
    path('find-similar-friends/', views.find_similar_friends, name='find_friend'),

    # Subscription and Payment URLs
    path('subscription-tiers/', views.get_subscription_tiers, name='get_subscription_tiers'),
    path('create-paypal-order/', views.create_paypal_order, name='create_paypal_order'),
    path('capture-paypal-payment/', views.capture_paypal_payment, name='capture_paypal_payment'),
    
    # PayPal return URLs (for frontend routing)
    path('payment/success/', views.payment_success_view, name='payment_success'),
    path('payment/cancel/', views.payment_cancel_view, name='payment_cancel'),
]


