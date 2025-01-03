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
          src="https://media.istockphoto.com/id/181866332/photo/red-wall-calendar.jpg?s=612x612&w=0&k=20&c=FpWwH-rY03pLmNsibkcJ_zbnqCIx1sbI5pRsQ9q5yLg=" // Example calendar image
          alt="Calendar"
          className="calendar-image"
        />
      </div>
    </div>
  );
}

export default Dashboard;
