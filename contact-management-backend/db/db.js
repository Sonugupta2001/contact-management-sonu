const { Client } = require('pg');
require('dotenv').config();

// Function to create the database if it doesn't exist
const createDatabaseIfNotExists = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        if (res.rowCount === 0) {
            console.log(`Database ${process.env.DB_NAME} does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log(`Database ${process.env.DB_NAME} created successfully.`);
        }
    } catch (error) {
        console.error('Error checking or creating database:', error);
    } finally {
        client.end();
    }
};

// Function to create the table if it doesn't exist
const createTableIfNotExists = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        const res = await client.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                phone_number VARCHAR(15),
                company VARCHAR(100),
                job_title VARCHAR(100)
            );
        `);
        console.log('Table `contacts` ensured successfully.');
    } catch (error) {
        console.error('Error checking or creating table:', error);
    } finally {
        client.end();
    }
};

// Function to initialize the database and table
const initializeDatabase = async () => {
    await createDatabaseIfNotExists();
    await createTableIfNotExists();
};

module.exports = { initializeDatabase };
