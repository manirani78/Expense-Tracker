import React, { useState } from 'react';

const ExpenseForm = ({ categories = [], onSubmit, initialData = {}, onClear }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    amount: initialData.amount || '',
    date: initialData.date || '',
    category: initialData.category || '',
    notes: initialData.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData({ title: '', amount: '', date: '', category: '', notes: '' });
    if (onClear) onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Amount</label>
        <input
          type="number"
          name="amount"
          min="0.01"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Notes (optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
