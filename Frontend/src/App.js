// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './components/Layout/SidebarLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense from "./components/Expenses/EditExpense";
import Analytics from './pages/Analytics';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes inside SidebarLayout */}
        {isAuthenticated && (
          <Route path="/" element={<SidebarLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="edit-expense/:id" element={<EditExpense />} />
            <Route path="analytics" element={<Analytics />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        )}

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
