# Expense Tracker

A full-stack Expense Tracker application built with **Node.js**, **Express**, **MySQL (Sequelize ORM)** for the backend and **React.js** for the frontend.  
It supports user authentication with JWT, and allows users to create, read, update, and delete their expenses securely.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Prerequisites](#prerequisites)  
- [Installation & Setup](#installation--setup)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  

- [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
- [Future Improvements](#future-improvements)  
- [License](#license)

---

## Features

- User Registration and Login (JWT authentication)  
- Create, Read, Update, Delete (CRUD) operations for Expenses  
- Secure backend routes protected by JWT middleware  
- Frontend React app to display expenses and login/logout functionality  
- Sequelize ORM for MySQL database interactions  
- Easy to extend and customize

---

## Technologies Used

- **Backend:** Node.js, Express.js, Sequelize ORM, MySQL, JWT, bcrypt  
- **Frontend:** React.js, Axios  
- **Others:** dotenv for environment variables, nodemon for development

---

## Project Structure

expense-tracker/
├── backend/
│ ├── config/ # Database config & connection
│ ├── controllers/ # Business logic for auth & expenses
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # Sequelize models (User, Expense)
│ ├── routes/ # API routes
│ ├── expense_tracker_seed.sql/ # (optional) initial data seeders
│ ├── app.js # Express app entry point
│ ├── server.js # developemnt server
│ ├── .env # Environment variables
│ └── package.json # Backend dependencies
├── frontend/
│ ├── public/ # Public files (index.html)
│ ├── src/
│ │ ├── components/ # React components for Auth, Expenses,Layout etc.
│ │ ├── context/ # React context for auth state
│ │ ├── services/ # Axios API client setup
│ │ ├── App.js # Main React component
│ │ └── index.js # React app entry point
│ └── package.json # Frontend dependencies
└── README.md # Project documentation

---

## Prerequisites

- Node.js (v16 or later recommended)  
- npm (comes with Node.js)  
- MySQL server installed and running  
- Optional: nodemon installed globally (`npm install -g nodemon`) for auto-reloading backend

---
## Setup Instructions

### Backend

1. Navigate to backend folder  
   `cd backend`

2. Install dependencies  
   `npm install`

3. Set up your `.env` file .
4. Create JWT_SECRET_Key.
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
5. Run the backend server  
   `npm run dev` (requires nodemon) 

### Frontend

1. Navigate to frontend folder  
   `cd frontend`

2. Install dependencies  
   `npm install`

3. Run the React app  
   `npm start`

---
### Running the Application

Backend server runs on: http://localhost:5000 (default port)

React frontend runs on: http://localhost:3000 (default React port)

Visit http://localhost:3000 in your browser to use the Expense Tracker app.

### API Endpoints
| Method | Endpoint             | Description             | Body                     |
| ------ | -------------------- | ----------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register new user       | `{ username, password }` |
| POST   | `/api/auth/login`    | User login, returns JWT | `{ username, password }` |

### Expenses (Requires JWT Auth in Authorization Header)

| Method | Endpoint            | Description               | Body                            |
| ------ | ------------------- | ------------------------- | ------------------------------- |
| GET    | `/api/expenses`     | Get all expenses for user | -                               |
| POST   | `/api/expenses`     | Create new expense        | `{ description, amount, date }` |
| PUT    | `/api/expenses/:id` | Update expense by ID      | `{ description, amount, date }` |
| DELETE | `/api/expenses/:id` | Delete expense by ID      | -                               |


### Notes

- Backend uses Express.js with Sequelize ORM connected to MySQL.
- Frontend uses React with Axios to connect to backend APIs.
- JWT authentication for protected routes.
- Make sure MySQL is running and accessible with your `.env` credentials.

### License

This project is licensed under the MIT License.

Feel free to contribute or report issues!