import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF5', '#F56B6B'];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalBudget] = useState(1000);
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
      const total = data.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      setTotalSpentAmount(total);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        alert("Expense deleted!");
        fetchExpenses();
      } catch (error) {
        console.error("Failed to delete expense", error);
        alert("Failed to delete expense.");
      }
    }
  };

  const handleEdit = (expense) => {
    navigate(`/edit-expense/${expense.id}`);
  };

  const categoryTotals = {};
  expenses.forEach((exp) => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += parseFloat(exp.amount);
  });

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Budget</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Spent</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">${totalSpentAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Remaining</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">${(totalBudget - totalSpentAmount).toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        {expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {expenses.slice(-5).reverse().map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{exp.title}</td>
                    <td className="px-4 py-2">{exp.category}</td>
                    <td className="px-4 py-2 text-right">${parseFloat(exp.amount).toFixed(2)}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No recent transactions found.</p>
        )}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Spending by Category</h2>
        {pieData.length > 0 ? (
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        ) : (
          <p className="text-center text-gray-500">No chart data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
