import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyAdmin.css';

function Company() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyname: '', // Changed to 'companyname'
    location: '',
    linkedinProfile: '',
    emails: '',
    phoneNumbers: '',
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
    setNewCompany(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddCompany = () => {
    // Ensure all fields are filled before adding the company
    if (!newCompany.companyname || !newCompany.location || !newCompany.linkedinProfile || !newCompany.emails || !newCompany.phoneNumbers || !newCompany.communicationPeriodicity) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('https://entnt-calender-1.onrender.com/api/companies', newCompany)
      .then((response) => {
        setCompanies([...companies, response.data]);
        setNewCompany({ companyname: '', location: '', linkedinProfile: '', emails: '', phoneNumbers: '', comments: '', communicationPeriodicity: '' });
        setShowInputFields(false); // Hide input fields after adding the company
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
    setNewCompany({ ...company }); // Populate form with company data
    setShowInputFields(true); // Show input fields for editing
  };

  const handleUpdateCompany = () => {
    axios.put(`https://entnt-calender-1.onrender.comapi/companies/${editCompanyId}`, newCompany)
      .then((response) => {
        const updatedCompanies = companies.map((company) =>
          company.id === editCompanyId ? response.data : company
        );
        setCompanies(updatedCompanies);
        setNewCompany({ companyname: '', location: '', linkedinProfile: '', emails: '', phoneNumbers: '', comments: '', communicationPeriodicity: '' });
        setEditCompanyId(null);
        setShowInputFields(false); // Hide input fields after updating
      })
      .catch((error) => {
        console.error('There was an error updating the company!', error);
      });
  };

  return (
    <div className="container">
      <h2 className="company-heading">Company List</h2>

      {/* Add New Company Section */}
      <div className="add-company">
        <h2 className="add-company-heading">Add New Company</h2>

        {showInputFields && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              name="companyname" // Changed to 'companyname'
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

        {!showInputFields && (
          <button onClick={() => setShowInputFields(true)} className="add-button">Add Company</button>
        )}

        {showInputFields && (
          <button onClick={handleAddCompany} className="add-button-save">Save</button>
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
                <td>{company.companyname}</td> {/* Changed to 'companyname' */}
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

      {/* Edit Company Form */}
      {editCompanyId && (
        <div className="edit-company">
          <h3>Edit Company</h3>
          <input
            type="text"
            placeholder="Company Name"
            name="companyname" // Changed to 'companyname'
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
          <button onClick={handleUpdateCompany} className="update-button">Update</button>
        </div>
      )}
    </div>
  );
}

export default Company;
