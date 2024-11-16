const pool = require('../db/db');
const { validationResult } = require('express-validator');

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new contact
const addContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { first_name, last_name, email, phone_number, company, job_title } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, email, phone_number, company, job_title]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { first_name, last_name, email, phone_number, company, job_title } = req.body;

    try {
        const result = await pool.query(
            `UPDATE contacts
             SET first_name = COALESCE($1, first_name),
                 last_name = COALESCE($2, last_name),
                 email = COALESCE($3, email),
                 phone_number = COALESCE($4, phone_number),
                 company = COALESCE($5, company),
                 job_title = COALESCE($6, job_title)
             WHERE id = $7 RETURNING *`,
            [first_name, last_name, email, phone_number, company, job_title, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'Contact not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) return res.status(404).json({ error: 'Contact not found' });

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getContacts, addContact, updateContact, deleteContact };
