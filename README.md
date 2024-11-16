# Contact Management System

This is a full-stack **Contact Management System** built with **ReactJS** on the frontend, **NodeJS** (Express) on the backend, and a database of your choice (e.g., MongoDB, PostgreSQL, MySQL) to store contact information.

The system allows users to **add**, **view**, **edit**, and **delete** contact information, with the ability to organize and manage a list of contacts in a user-friendly interface.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
   1. [Frontend Setup](#frontend-setup)
   2. [Backend Setup](#backend-setup)
   3. [Database Setup](#database-setup)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Database Schema](#database-schema)
6. [Major Technical Decisions](#major-technical-decisions)
7. [How the Application Works](#how-the-application-works)

---

## Project Overview

The **Contact Management System** allows users to store and manage contact details such as:

- **First Name**
- **Last Name**
- **Email**
- **Phone Number**
- **Company**
- **Job Title**

This system consists of two main parts:
1. **Frontend (ReactJS)**: Provides the user interface to interact with contacts.
2. **Backend (NodeJS + Express)**: Handles API calls and manages CRUD operations in the database.
   
Clone the repository:
```bash
   git clone https://github.com/Sonugupta2001/contact-management-sonu.git
```
# Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend
```

Install the necessary dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```

The frontend will be available at
```bash
http://localhost:3000
```

# Backend Setup

Navigate to the backend folder:
```bash
cd backend
```
Install the required dependencies:
```bash
npm install
```

Create a .env file in the root of the backend project with the following configuration (example for MongoDB):
```text
DATABASE_URL=mongodb://localhost:27017/contact-management
PORT=5000
```

Start the backend server:
```bash
npm start
```

The backend API will be running at
```bash
http://localhost:5000
```
