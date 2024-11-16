import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ contactId, onFormSubmit }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        company: '',
        job_title: '',
    });

    // Fetch contact details for editing
    useEffect(() => {
        if (contactId) {
            axios.get(`http://localhost:5000/contacts/${contactId}`)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(err => console.error(err));
        }
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contactId) {
            // Update existing contact
            axios.put(`http://localhost:5000/contacts/${contactId}`, formData)
                .then(response => {
                    onFormSubmit(response.data);
                })
                .catch(err => console.error(err));
        } else {
            // Add new contact
            axios.post('http://localhost:5000/contacts', formData)
                .then(response => {
                    onFormSubmit(response.data);
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                {contactId ? 'Edit Contact' : 'Add New Contact'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Job Title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                        {contactId ? 'Update Contact' : 'Add Contact'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactForm;
