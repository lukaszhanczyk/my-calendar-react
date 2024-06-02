// src/Dashboard.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>This is a protected page.</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
