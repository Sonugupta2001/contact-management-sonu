const express = require('express');
const { body } = require('express-validator');
const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contactsController');

const router = express.Router();

// Get all contacts
router.get('/', getContacts);

// Add a new contact
router.post(
    '/',
    [
        body('first_name').notEmpty().withMessage('First Name is required'),
        body('last_name').notEmpty().withMessage('Last Name is required'),
        body('email').isEmail().withMessage('Valid Email is required'),
    ],
    addContact
);

// Update a contact
router.put(
    '/:id',
    [
        body('first_name').optional().notEmpty().withMessage('First Name cannot be empty'),
        body('last_name').optional().notEmpty().withMessage('Last Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Valid Email is required'),
    ],
    updateContact
);

// Delete a contact
router.delete('/:id', deleteContact);

module.exports = router;
