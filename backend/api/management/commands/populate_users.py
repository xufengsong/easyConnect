# api/management/commands/populate_users.py

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError
import json

class Command(BaseCommand):
    help = 'Populates the database with 5 fake elderly users'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        fake_users_data = [
            {
                "name": "Eleanor Vance",
                "email": "eleanor.vance@example.com",
                "username": "eleanor_vance",
                "interest": {
                    "hobbies": ["knitting", "gardening"], 
                    "topics": ["local history", "classical music"], 
                    "personality": "calm", 
                    "goals": "find a companion for weekly walks"
                },
            },
            {
                "name": "Robert Sterling",
                "email": "robert.sterling@example.com",
                "username": "robert_sterling",
                "interest": {
                    "hobbies": ["woodworking", "fishing"], 
                    "topics": ["WWII history", "classic cars"], 
                    "personality": "adventurous", 
                    "goals": "share project ideas with a like-minded person"
                },
            },
            {
                "name": "Doris Chen",
                "email": "doris.chen@example.com",
                "username": "doris_chen",
                "interest": {
                    "hobbies": ["cooking", "tai chi"], 
                    "topics": ["travel stories", "modern art"], 
                    "personality": "warm", 
                    "goals": "practice conversational Mandarin"
                },
            },
            {
                "name": "Arthur Hayes",
                "email": "arthur.hayes@example.com",
                "username": "arthur_hayes",
                "interest": {
                    "hobbies": ["reading fiction", "bird watching"], 
                    "topics": ["politics", "finance"], 
                    "personality": "intellectual", 
                    "goals": "debate current events"
                },
            },
            {
                "name": "Mildred Ruiz",
                "email": "mildred.ruiz@example.com",
                "username": "mildred_ruiz",
                "interest": {
                    "hobbies": ["painting", "yoga"], 
                    "topics": ["poetry", "spirituality"], 
                    "personality": "gentle", 
                    "goals": "connect with an AI to write a memoir"
                },
            },
        ]

        self.stdout.write("Starting fake user data insertion...")
        
        count = 0
        for data in fake_users_data:
            try:
                user, created = User.objects.get_or_create(
                    email=data['email'],
                    defaults={
                        'username': data['username'],
                        'name': data['name'],
                        'interest': data['interest'],
                    }
                )
                if created:
                    user.set_password('password123')
                    user.save()
                    self.stdout.write(self.style.SUCCESS(f"Created user: {user.name}"))
                    count += 1
                else:
                    self.stdout.write(f"User {user.name} already exists.")
                    
            except IntegrityError as e:
                self.stdout.write(self.style.ERROR(f"Error creating {data['name']}: {e}"))

        self.stdout.write(self.style.SUCCESS(f"--- Process Complete. {count} new users created. ---"))