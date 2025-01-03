const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


// File path to store the companies data
const companiesFilePath = path.join(__dirname, './companies.json')

// Read all companies data from the JSON file
const readCompaniesData = () => {
  const data = fs.readFileSync(companiesFilePath);
  return JSON.parse(data);
};

// Write companies data to the JSON file
const writeCompaniesData = (data) => {
  fs.writeFileSync(companiesFilePath, JSON.stringify(data, null, 2));
};

// Get all companies
router.get('/companies', (req, res) => {
  try {
    const companies = readCompaniesData();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Error reading companies data' });
  }
});

// Add a new company
router.post('/companies', (req, res) => {
  const { companyname, location, linkedinProfile, emails, phoneNumbers, comments, communicationPeriodicity } = req.body;

  if (!companyname || !location || !linkedinProfile || !emails || !phoneNumbers || !communicationPeriodicity) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  try {
    const companies = readCompaniesData();
    const newCompany = {
      id: companies.length + 1,
      companyname, // Changed from 'name' to 'companyName'
      location,
      linkedinProfile,
      emails: emails.split(',').map(email => email.trim()),
      phoneNumbers: phoneNumbers.split(',').map(phone => phone.trim()),
      comments,
      communicationPeriodicity
    };
    
    companies.push(newCompany);
    writeCompaniesData(companies);
    
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ error: 'Error adding new company' });
  }
});

// Update a company by ID
router.put('/companies/:id', (req, res) => {
  const { id } = req.params;
  const { companyName, location, linkedinProfile, emails, phoneNumbers, comments, communicationPeriodicity } = req.body;

  try {
    const companies = readCompaniesData();
    const companyIndex = companies.findIndex(company => company.id === parseInt(id));

    if (companyIndex === -1) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const updatedCompany = {
      ...companies[companyIndex],
      companyname, // Changed from 'name' to 'companyName'
      location,
      linkedinProfile,
      emails: emails.split(',').map(email => email.trim()),
      phoneNumbers: phoneNumbers.split(',').map(phone => phone.trim()),
      comments,
      communicationPeriodicity
    };

    companies[companyIndex] = updatedCompany;
    writeCompaniesData(companies);

    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ error: 'Error updating company' });
  }
});

// Delete a company by ID
router.delete('/companies/:id', (req, res) => {
  const { id } = req.params;

  try {
    let companies = readCompaniesData();
    companies = companies.filter(company => company.id !== parseInt(id));

    writeCompaniesData(companies);
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting company' });
  }
});

module.exports = router;
