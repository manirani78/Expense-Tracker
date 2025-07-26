import React, { useEffect, useState } from 'react';
import { getExpenses } from '../services/api';
import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF5', '#F56B6B'];

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [dateRange, setDateRange] = useState('this_month');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = [...expenses];

    if (categoryFilter) {
      filtered = filtered.filter((exp) => exp.category === categoryFilter);
    }

    const now = new Date();
    if (dateRange === 'last_7_days') {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      filtered = filtered.filter((exp) => new Date(exp.date) >= sevenDaysAgo);
    } else if (dateRange === 'this_month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter((exp) => new Date(exp.date) >= startOfMonth);
    }

    setFilteredExpenses(filtered);
  }, [expenses, dateRange, categoryFilter]);

  const dailyTotals = {};
  filteredExpenses.forEach((exp) => {
    const day = new Date(exp.date).toLocaleDateString();
    if (!dailyTotals[day]) dailyTotals[day] = 0;
    dailyTotals[day] += parseFloat(exp.amount);
  });
  const barData = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount,
  }));

  const categoryTotals = {};
  filteredExpenses.forEach((exp) => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += parseFloat(exp.amount);
  });
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Analytics</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          aria-label="Select Date Range"
        >
          <option value="last_7_days">Last 7 Days</option>
          <option value="this_month">This Month</option>
        </select>

        <select
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Select Category"
        >
          <option value="">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Bar Chart */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Expenses Over Time</h2>
        {barData.length > 0 ? (
          <BarChart
            width={700}
            height={300}
            data={barData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <p className="text-center text-gray-500">No data available for selected filters.</p>
        )}
      </section>

      {/* Pie Chart */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Spending by Category</h2>
        {pieData.length > 0 ? (
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#4f46e5"
                paddingAngle={3}
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
          <p className="text-center text-gray-500">No data available for selected filters.</p>
        )}
      </section>

      {/* Spending Trends */}
      <section className="bg-gray-50 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Spending Trends</h2>
        <p className="text-gray-700">Groceries spending increased by 20% compared to last month.</p>
      </section>
    </div>
  );
};

export default Analytics;
