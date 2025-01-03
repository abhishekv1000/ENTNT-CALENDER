import React from 'react';
import './Dashboard.css'; 
import { Link } from 'react-router-dom'; 

function Dashboard() {
  return (
    <div className="container">
      <h2 className="title">Calendar Application for Communication Tracking</h2>
      <div className="metricsContainer">
        <div className="metric">
          <Link to="/admin" className="metric-link">
            <h3>Admin</h3>
          </Link>
        </div>
        <div className="metric">
          <Link to="/client" className="metric-link">
            <h3>Client</h3>
          </Link>
        </div>
        <div className="metric">
          <Link to="/appointments" className="metric-link">
            <h3>Client Calendar View</h3>
          </Link>
        </div>
      </div>
      
      {/* Image below all buttons */}
      <div className="image-container">
        <img 
          src="https://plus.unsplash.com/premium_photo-1722945611742-096d5d1d6351?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example calendar image
          alt="Calendar"
          className="calendar-image"
        />
      </div>
    </div>
  );
}

export default Dashboard;
