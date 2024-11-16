import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
    const [editingContactId, setEditingContactId] = useState(null);
    const [contactsChanged, setContactsChanged] = useState(false);

    const handleFormSubmit = (contact) => {
        setEditingContactId(null);
        setContactsChanged(true);
    };

    const handleEdit = (id) => {
        setEditingContactId(id);
    };

    const handleDelete = (id) => {
        setContactsChanged(true);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center">
                Contact Management
            </Typography>
            <Box mb={3}>
                <ContactForm contactId={editingContactId} onFormSubmit={handleFormSubmit} />
            </Box>
            <Box>
                <ContactTable onEdit={handleEdit} onDelete={handleDelete} />
            </Box>
        </Container>
    );
};

export default App;
