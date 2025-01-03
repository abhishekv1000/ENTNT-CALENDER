import React, { useState, useEffect } from 'react';
import './Appointment.css';  // Import the CSS file for styling
import axios from 'axios';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import the CSS for the calendar

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState(new Date());

  // Fetch appointment data when the component mounts
  useEffect(() => {
    axios.get('https://entnt-calender-1.onrender.com/api/appointments')
      .then((response) => {
        setAppointments(response.data); // Set the fetched appointment data to state
      })
      .catch((error) => {
        console.error('Error fetching appointment data:', error);
      });
  }, []);  // Empty dependency array to run only once when component mounts

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment); // Set the selected appointment to show details
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null); // Close the details view
  };

  // Handle date change in the calendar
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedAppointment(null);  // Reset selected appointment when a new date is chosen
  };

  // Get the appointments for the selected date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.orderDate);
    return appointmentDate.toDateString() === date.toDateString();
  });

  // Function to update appointment status
  const handleChangeStatus = (appointmentId, newStatus) => {
    // Update status locally
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    );
    setAppointments(updatedAppointments);

    // Optionally, you can make an API call here to update the status in the backend:
    // axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, { status: newStatus })
    //   .then(response => console.log('Status updated successfully'))
    //   .catch(error => console.error('Error updating status:', error));
  };

  // Map over appointments and create a color code based on status
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const appointmentOnDate = appointments.find(appointment => {
        const appointmentDate = new Date(appointment.orderDate);
        return appointmentDate.toDateString() === date.toDateString();
      });

      if (appointmentOnDate) {
        return appointmentOnDate.status === 'pending' ? 'yellow' : 'green'; // Add classes based on status
      }
    }
    return null;
  };

  return (
    <div className="appointment-container">
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange} // Handle date change
          value={date}  // Set the selected date
          tileClassName={tileClassName} // Assign the tileClassName function to color tiles
        />
      </div>

      <div className="appointment-details-container">
        {selectedAppointment ? (
          <div className="appointment-details">
            <h3>Appointment Details</h3>
            <p><strong>ID:</strong> {selectedAppointment.id}</p>
            <p><strong>Customer Name:</strong> {selectedAppointment.customername}</p>
            <p><strong>Company Name:</strong> {selectedAppointment.companyname}</p>
            <p><strong>Order Date:</strong> {selectedAppointment.orderDate}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
            <p><strong>Communication Periodicity:</strong> {selectedAppointment.communicationPeriodicity}</p>
            <button onClick={handleCloseDetails} className="close-details-button">Close Details</button>
          </div>
        ) : (
          <div className="appointment-list">
            <h3>Appointments for {date.toDateString()}</h3>
            {filteredAppointments.length === 0 ? (
              <p>No appointments on this day.</p>
            ) : (
              <ul>
                {filteredAppointments.map(appointment => (
                  <li key={appointment.id} className="appointment-item">
                    <p><strong>Customer Name:</strong> {appointment.customername}</p>
                    <p><strong>Company Name:</strong> {appointment.companyname}</p>
                    <p><strong>Order Date:</strong> {appointment.orderDate}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                    <button onClick={() => handleViewAppointmentDetails(appointment)} className="view-details-button">View Details</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Table to show all appointments */}
      <div className="appointment-table-container">
        <h3>All Appointments</h3>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Communication Periodicity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.customername}</td>
                <td>{appointment.companyname}</td>
                <td>{appointment.orderDate}</td>
                <td>{appointment.status}</td>
                <td>{appointment.communicationPeriodicity}</td>
                <td>
                  {appointment.status === 'pending' ? (
                    <button onClick={() => handleChangeStatus(appointment.id, 'confirmed')} className="status-button">Mark as Confirmed</button>
                  ) : (
                    <button disabled className="status-button-confirmed">Confirmed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointment;
