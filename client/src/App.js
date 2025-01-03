// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CompanyAdmin from './Components/CompanyAdmin';
import Appointment from './Components/Appointments';
import Client from './Components/Client';
import './App.css'; 
// import Appointment from '../../api/routes/usersappoint';

function App() {
  return (
    <Router>
      
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<CompanyAdmin />} />
          <Route path="/appointments" element={<Appointment/>} />
        </Routes>
      
    </Router>
  );
}

export default App;
