const express = require('express');
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

// POST - Create a new contact
router.post('/', createContact);

// GET - Fetch all contacts
router.get('/', getContacts);

// PUT - Update a contact by ID
router.put('/:id', updateContact);

// DELETE - Delete a contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
