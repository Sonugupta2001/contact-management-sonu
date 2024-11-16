import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, Paper } from '@mui/material';
import axios from 'axios';

const ContactTable = ({ onEdit, onDelete }) => {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:5000/contacts')
            .then(response => {
                setContacts(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/contacts/${id}`)
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
            })
            .catch(err => console.error(err));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => (
                        <TableRow key={contact.id}>
                            <TableCell>{contact.first_name}</TableCell>
                            <TableCell>{contact.last_name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone_number}</TableCell>
                            <TableCell>{contact.company}</TableCell>
                            <TableCell>{contact.job_title}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => onEdit(contact.id)}>Edit</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(contact.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ContactTable;
