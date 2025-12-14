from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import requests

class Command(BaseCommand):
    help = 'Generates embeddings for users using Ollama'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        OLLAMA_API_URL = "http://localhost:11434/api/embeddings"
        OLLAMA_MODEL = "nomic-embed-text" 

        # Grab all users (or filter as needed)
        users_to_process = User.objects.all()

        self.stdout.write(f"Found {users_to_process.count()} users to process...")

        for user in users_to_process:
            self.stdout.write(f"Processing user: {user.name} ({user.email})...")
            
            # --- 1. Validate Data Structure ---
            interests = user.interest
            
            if not interests:
                self.stdout.write(self.style.WARNING(f"   ⚠️ Skipping: No interest data found."))
                continue

            # if not isinstance(interests, dict):
            #     self.stdout.write(self.style.WARNING(f"   ⚠️ Skipping: 'interest' is not a Dictionary (found {type(interests)})."))
            #     continue

            if isinstance(interests, dict):
                # --- 2. Construct Prompt ---
                try:
                    hobbies = ", ".join(interests.get("hobbies", []))
                    topics = ", ".join(interests.get("topics", []))
                    prompt = (
                        f"Personality: {interests.get('personality', 'unknown')}. "
                        f"Interests: {hobbies}. "
                        f"Topics: {topics}. "
                        f"Goal: {interests.get('goals', '')}."
                    )
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"   ❌ Error building prompt: {e}"))
                    continue
            
            if isinstance(interests, list):
                try:
                    hobbies = ", ".join(n for n in interests)
                    prompt = (
                        f"Interests: {hobbies}. "
                    )
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"   ❌ Error building prompt: {e}"))
                    continue

            # --- 3. Call Ollama ---
            try:
                response = requests.post(
                    OLLAMA_API_URL, 
                    json={"model": OLLAMA_MODEL, "prompt": prompt}
                )
                response.raise_for_status()
                data = response.json()
                embedding = data.get("embedding")
                
                if embedding:
                    user.embedding = embedding
                    user.save(update_fields=['embedding'])
                    self.stdout.write(self.style.SUCCESS(f"   ✅ Saved embedding for {user.name}"))
                else:
                    # Print the error from Ollama to debug why Mildred failed
                    self.stdout.write(self.style.WARNING(f"   ⚠️ No embedding returned. Ollama said: {data}"))
            
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"   ❌ Connection error with Ollama: {e}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"   ❌ Unexpected error: {e}"))