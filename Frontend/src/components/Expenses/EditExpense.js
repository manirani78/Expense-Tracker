import React, { useState, useEffect } from "react";
import { getExpenses, updateExpense } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories] = useState([
    "Groceries",
    "Food",
    "Health",
    "Tech",
    "Rent",
    "Transport",
    "Utilities",
    "Other",
  ]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const allExpenses = await getExpenses();
        const found = allExpenses.find((e) => e.id.toString() === id);
        if (found) {
          setExpense(found);
          setForm({
            title: found.title,
            amount: found.amount,
            date: found.date.split("T")[0],
            category: found.category,
          });
        }
      } catch (error) {
        console.error("Failed to fetch expense:", error);
      }
    };

    fetchExpenses();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpense(id, form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update expense.");
    } finally {
      setLoading(false);
    }
  };

  if (!expense) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading expense data...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block font-medium mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount (e.g., 50.00)"
            min="0"
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Expense"}
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
