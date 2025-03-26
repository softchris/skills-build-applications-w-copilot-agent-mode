from rest_framework import viewsets
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from bson import ObjectId

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': request.build_absolute_uri('api/users/'),
        'teams': request.build_absolute_uri('api/teams/'),
        'activities': request.build_absolute_uri('api/activities/'),
        'leaderboard': request.build_absolute_uri('api/leaderboard/'),
        'workouts': request.build_absolute_uri('api/workouts/')
    })

@api_view(['POST'])
def add_user(request):
    print('Incoming POST request to /api/add_user/')  # Log the request
    print('Request data:', request.data)  # Log the incoming data

    # Generate a new ObjectId if '_id' is not provided
    data = request.data.copy()
    if '_id' not in data:
        data['_id'] = str(ObjectId()) 

    # Check for duplicate username or email
    username = data.get('username')
    email = data.get('email')
   

    serializer = UserSerializer(data=data)
    # Check if the username already exists

    def check_duplicates(username, email):
        exist = User.objects.filter(username=username)
        print(f'Checking for existing username: {username}')  # Log the check
        if len(exist) > 0:
            print(f'Username {username} already exists.')  
            return True, "Username already exists."
            
        exist = User.objects.filter(email=email)
        if len(exist) > 0:
            return True, "Email already exists."
           
        return False, ""
      

    print('Checking for duplicates...')  # Log the start of duplicate checks
    is_duplicate, message = check_duplicates(username, email)    
    
    if is_duplicate == True:
        print('Duplicate username or email found.')
        return Response({'error': message}, status=status.HTTP_400_BAD_REQUEST)

    print('Username and email checks completed.')  # Log completion of checks
    if serializer.is_valid():
        print('Data is valid. Saving user...')  # Log validation success
        serializer.save()
        print('User saved successfully.')  # Log successful save
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print('Validation failed. Errors:', serializer.errors)  # Log validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)