from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import timedelta

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.email, "testuser@example.com")

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User.objects.create(username="teamuser", email="teamuser@example.com", password="password123")
        team = Team.objects.create(name="Test Team")
        team.members.add(user)
        self.assertEqual(team.name, "Test Team")
        self.assertIn(user, team.members.all())

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username="activityuser", email="activityuser@example.com", password="password123")
        activity = Activity.objects.create(user=user, activity_type="Running", duration=timedelta(minutes=30))
        self.assertEqual(activity.activity_type, "Running")
        self.assertEqual(activity.duration, timedelta(minutes=30))

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard_entry(self):
        user = User.objects.create(username="leaderboarduser", email="leaderboarduser@example.com", password="password123")
        leaderboard = Leaderboard.objects.create(user=user, score=100)
        self.assertEqual(leaderboard.score, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Test Workout", description="A test workout description.")
        self.assertEqual(workout.name, "Test Workout")
        self.assertEqual(workout.description, "A test workout description.")