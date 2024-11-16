const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');
const { initializeDatabase } = require('./db/db'); // Import the database initialization function

require('dotenv').config();

const app = express();

// Initialize the database and ensure the table exists
initializeDatabase().then(() => {
    console.log('Database and table setup complete.');

    // Set up middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Set up routes
    app.use('/contacts', contactsRoutes);

    const PORT = process.env.PORT || 5000;

    // Start the server after database initialization
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error during database initialization:', error);
});
