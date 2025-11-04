import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div>Welcome to OctoFit Tracker — choose a view from the menu.</div>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/workouts" element={<Workouts/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </div>
  );
}

export default App;
