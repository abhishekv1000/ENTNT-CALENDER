import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyAdmin.css';

function Company() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyname: '',
    location: '',
    linkedinProfile: '',
    emails: [],
    phoneNumbers: [],
    comments: '',
    communicationPeriodicity: ''
  });
  const [showInputFields, setShowInputFields] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);

  // Fetch companies from the backend when the component is mounted
  useEffect(() => {
    axios.get('https://entnt-calender-1.onrender.com/api/companies')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the companies!', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle comma-separated values (emails, phone numbers)
    if (name === 'emails' || name === 'phoneNumbers') {
      setNewCompany(prevState => ({
        ...prevState,
        [name]: value.split(',').map(val => val.trim())
      }));
    } else {
      setNewCompany(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddCompany = () => {
    if (!newCompany.companyname || !newCompany.location || !newCompany.linkedinProfile || !newCompany.emails.length || !newCompany.phoneNumbers.length || !newCompany.communicationPeriodicity) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('https://entnt-calender-1.onrender.com/api/companies', newCompany)
      .then((response) => {
        setCompanies([...companies, response.data]);
        setNewCompany({
          companyname: '',
          location: '',
          linkedinProfile: '',
          emails: [],
          phoneNumbers: [],
          comments: '',
          communicationPeriodicity: ''
        });
        setShowInputFields(false);
      })
      .catch((error) => {
        console.error('There was an error adding the company!', error);
      });
  };

  const handleDeleteCompany = (companyId) => {
    axios.delete(`https://entnt-calender-1.onrender.com/api/companies/${companyId}`)
      .then(() => {
        setCompanies(companies.filter(company => company.id !== companyId));
      })
      .catch((error) => {
        console.error('There was an error deleting the company!', error);
      });
  };

  const handleEditCompany = (company) => {
    setEditCompanyId(company.id);
    setNewCompany({
      ...company,
      emails: company.emails.join(', '), // Convert the emails and phone numbers arrays to comma-separated strings for editing
      phoneNumbers: company.phoneNumbers.join(', '),
    });
    setShowInputFields(true);
  };

  const handleUpdateCompany = () => {
    if (!newCompany.companyname || !newCompany.location || !newCompany.linkedinProfile || !newCompany.emails.length || !newCompany.phoneNumbers.length || !newCompany.communicationPeriodicity) {
      alert('Please fill in all fields.');
      return;
    }

    // Ensure emails and phoneNumbers are arrays
    const updatedCompanyData = {
      ...newCompany,
      emails: newCompany.emails.split(',').map(email => email.trim()),
      phoneNumbers: newCompany.phoneNumbers.split(',').map(phone => phone.trim())
    };

    // Make PUT request to update company data
    axios.put(`http://localhost:5000/api/companies/${editCompanyId}`, updatedCompanyData)
      .then((response) => {
        // Update the state with the updated company data
        const updatedCompanies = companies.map((company) =>
          company.id === editCompanyId ? response.data : company
        );
        setCompanies(updatedCompanies);

        // Reset the form and UI state after updating
        setNewCompany({
          companyname: '', location: '', linkedinProfile: '', emails: '', phoneNumbers: '', comments: '', communicationPeriodicity: ''
        });
        setEditCompanyId(null);
        setShowInputFields(false);
      })
      .catch((error) => {
        // Log the error details and show a message to the user
        console.error('There was an error updating the company!', error);
        alert('Failed to update the company. Please try again.');
      });
  };

  const resetForm = () => {
    setNewCompany({
      companyname: '',
      location: '',
      linkedinProfile: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: ''
    });
    setShowInputFields(false);
    setEditCompanyId(null);
  };

  return (
    <div className="container">
      <h2 className="company-heading">Company List</h2>

      {/* Add New Company Section */}
      <div className="add-company">
        <h2 className="add-company-heading">{editCompanyId ? 'Edit Company' : 'Add New Company'}</h2>

        {showInputFields && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              name="companyname"
              value={newCompany.companyname}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={newCompany.location}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="LinkedIn Profile"
              name="linkedinProfile"
              value={newCompany.linkedinProfile}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Emails (comma separated)"
              name="emails"
              value={newCompany.emails}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Phone Numbers (comma separated)"
              name="phoneNumbers"
              value={newCompany.phoneNumbers}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Comments"
              name="comments"
              value={newCompany.comments}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Communication Periodicity"
              name="communicationPeriodicity"
              value={newCompany.communicationPeriodicity}
              onChange={handleInputChange}
              className="input-field"
            />
          </>
        )}

        {/* Buttons for Add or Update */}
        {!showInputFields && (
          <button onClick={() => setShowInputFields(true)} className="add-button">Add Company</button>
        )}

        {showInputFields && !editCompanyId && (
          <button onClick={handleAddCompany} className="add-button-save">Save</button>
        )}

        {showInputFields && editCompanyId && (
          <button onClick={handleUpdateCompany} className="update-button">Update</button>
        )}

        {showInputFields && (
          <button onClick={resetForm} className="cancel-button">Cancel</button>
        )}
      </div>

      {/* Display Companies List as a Table */}
      <div className="companies-list">
        <table className="company-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Location</th>
              <th>LinkedIn Profile</th>
              <th>Emails</th>
              <th>Phone Numbers</th>
              <th>Comments</th>
              <th>Communication Periodicity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company.id}>
                <td>{company.companyname}</td>
                <td>{company.location}</td>
                <td>{company.linkedinProfile}</td>
                <td>{company.emails.join(', ')}</td>
                <td>{company.phoneNumbers.join(', ')}</td>
                <td>{company.comments}</td>
                <td>{company.communicationPeriodicity}</td>
                <td>
                  <button onClick={() => handleEditCompany(company)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteCompany(company.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Company;
