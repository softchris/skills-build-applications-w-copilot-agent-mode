from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed the database with initial data for all collections'

    def handle(self, *args, **kwargs):
        # Seed Users
        users = [
            {'_id': ObjectId(), 'username': 'user1', 'email': 'user1@example.com', 'password': 'password1'},
            {'_id': ObjectId(), 'username': 'user2', 'email': 'user2@example.com', 'password': 'password2'},
        ]
        for user_data in users:
            user, created = User.objects.get_or_create(_id=user_data['_id'], defaults=user_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"User '{user.username}' created."))

        # Seed Teams
        teams = [
            {'_id': ObjectId(), 'name': 'Team Alpha'},
            {'_id': ObjectId(), 'name': 'Team Beta'},
        ]
        for team_data in teams:
            team, created = Team.objects.get_or_create(_id=team_data['_id'], defaults={'name': team_data['name']})
            if created:
                self.stdout.write(self.style.SUCCESS(f"Team '{team.name}' created."))

        # Seed Activities
        activities = [
            {'_id': ObjectId(), 'user': User.objects.first(), 'activity_type': 'Running', 'duration': timedelta(minutes=30)},
            {'_id': ObjectId(), 'user': User.objects.last(), 'activity_type': 'Cycling', 'duration': timedelta(hours=1)},
        ]
        for activity_data in activities:
            activity, created = Activity.objects.get_or_create(_id=activity_data['_id'], defaults=activity_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Activity '{activity.activity_type}' created."))

        # Seed Leaderboard
        leaderboard_entries = [
            {'_id': ObjectId(), 'user': User.objects.first(), 'score': 100},
            {'_id': ObjectId(), 'user': User.objects.last(), 'score': 90},
        ]
        for entry_data in leaderboard_entries:
            entry, created = Leaderboard.objects.get_or_create(_id=entry_data['_id'], defaults=entry_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Leaderboard entry for '{entry.user.username}' created."))

        # Seed Workouts
        workouts = [
            {'_id': ObjectId(), 'name': 'Morning Yoga', 'description': 'A relaxing yoga session to start the day.'},
            {'_id': ObjectId(), 'name': 'Strength Training', 'description': 'Build muscle and improve strength.'},
        ]
        for workout_data in workouts:
            workout, created = Workout.objects.get_or_create(_id=workout_data['_id'], defaults=workout_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Workout '{workout.name}' created."))