import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      await registerUser(trimmedData);
      setSuccess('✅ Registered successfully! You can now log in.');
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-100 to-green-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-green-700">Create Account</h2>

        {success && (
          <div className="mb-4 p-3 text-sm bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-medium text-white rounded-lg transition duration-200 ${
            loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
