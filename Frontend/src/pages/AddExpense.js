import React, { useState } from 'react';
import { addExpense } from '../services/api';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Groceries',
  'Utilities',
  'Food',
  'Tech',
  'Transport',
  'Entertainment',
  'Health',
  'Others',
];

const AddExpense = () => {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    category: '',
    amount: '',
    notes: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClear = () => {
    setFormData({ date: '', title: '', category: '', amount: '', notes: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.title.trim() || !formData.category || !formData.amount) {
      alert('Please fill all required fields.');
      return;
    }
    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      await addExpense(formData);
      alert('Expense added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to add expense:', error);
      alert('Failed to add expense.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Add Expense</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200"
      >
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3"
            placeholder="e.g., Grocery shopping"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0.00"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3"
            placeholder="e.g., 50.00"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm p-3 resize-none"
            placeholder="Optional notes"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition-all"
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
