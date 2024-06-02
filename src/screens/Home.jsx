import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h2>Home</h2>
    <p>Welcome to the home page!</p>
    <Link to="/login">Go to Login</Link>
  </div>
);

export default Home;
