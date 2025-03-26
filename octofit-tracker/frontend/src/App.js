import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('useEffect called in Teams component');
    fetch('/api/teams/')
      .then(response => {
        console.log('Fetch response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Fetched teams data:', data);
        setTeams(data);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Teams</h1>
      <div className="row justify-content-center">
        {teams.length > 0 ? (
          teams.map(team => (
            <div className="col-md-4 mb-3" key={team._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{team.name}</h5>
                  <p className="card-text">This is a description for {team.name}.</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No teams available.</p>
        )}
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    fetch('/api/add_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(err => {
            const errorMessages = Object.entries(err)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
            throw new Error(errorMessages || 'Failed to add user');
        });
      })
      .then(data => {
        setUsers([...users, data]);
        setNewUser({ username: '', email: '', password: '' });
        setErrorMessage(''); // Clear error message on success
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setErrorMessage(error.message); // Set error message on failure
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Users</h1>
      <div className="row justify-content-center">
        {users.length > 0 ? (
          users.map(user => (
            <div className="col-md-4 mb-3" key={user._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{user.username}</h5>
                  <p className="card-text">Email: {user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No users available.</p>
        )}
      </div>
      <div className="mt-4">
        <h2>Add New User</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Activities</h1>
      <div className="row justify-content-center">
        {activities.length > 0 ? (
          activities.map(activity => (
            <div className="col-md-4 mb-3" key={activity._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{activity.activity_type}</h5>
                  <p className="card-text">Duration: {activity.duration}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No activities available.</p>
        )}
      </div>
    </div>
  );
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="container mt-5">
      <>
        <h1 className="text-center mb-4">Leaderboard</h1>
        <div className="row justify-content-center">
          {leaderboard.length > 0 ? (
            leaderboard.map(entry => (
              <div className="col-md-4 mb-3" key={entry._id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{entry.user.username}</h5>
                    <p className="card-text">Score: {entry.score}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No leaderboard entries available.</p>
          )}
        </div>
      </>
    </div>
  );
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('/api/workouts/')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Workouts</h1>
      <div className="row justify-content-center">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div className="col-md-4 mb-3" key={workout._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No workouts available.</p>
        )}
      </div>
    </div>
  );
}

// Add routes for the new components in the App component
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<h1>Welcome to OctoFit Tracker</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
