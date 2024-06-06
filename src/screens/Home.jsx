import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>
    <h1 className="my-calendar-title">myCalendar</h1>
    <p className="my-calendar-copy">Welcome to myCalendar, your personal planner and organizer. Stay on top of your schedule and manage your time effectively.</p>
    <div className="button-container">
      <Link to="/login">
        <Button className="button">Go to Login</Button>
      </Link>
    </div>
  </div>
);

export default Home;
