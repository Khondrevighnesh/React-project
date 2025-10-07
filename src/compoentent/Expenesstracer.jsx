import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Load data and theme from localStorage
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));

    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) setDarkMode(JSON.parse(storedTheme));
  }, []);

  // Save expenses and theme
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [expenses, darkMode]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      alert("Please fill all fields!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
      month: new Date().toLocaleString("default", { month: "short" }),
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categories = ["Food", "Travel", "Shopping", "study", "Other"];

  // Pie chart data
  const pieData = categories
    .map((cat) => {
      const value = expenses
        .filter((exp) => exp.category === cat)
        .reduce((sum, exp) => sum + exp.amount, 0);
      return { name: cat, value };
    })
    .filter((data) => data.value > 0);

  // Bar chart data
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const barData = months.map((month) => {
    const total = expenses
      .filter((exp) => exp.month === month)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { month, total };
  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#845EC2",
    "#FF66C4",
  ];

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 flex flex-col items-center py-10 px-4 md:px-0">
        {/* Header */}
        <div className="flex justify-between items-center w-full max-w-3xl mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            💸 Expense Tracker
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded transition-colors duration-500"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={addExpense}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md mb-6 transition-colors duration-500"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-500"
          >
            Add Expense
          </button>
        </form>

        {/* Filter */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-md mb-6 flex justify-between items-center transition-colors duration-500">
          <h2 className="text-lg font-semibold">Filter by Category:</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          >
            <option>All</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Expense List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md mb-6 transition-colors duration-500">
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No expenses found!
            </p>
          ) : (
            <ul>
              {filteredExpenses.map((exp) => (
                <li
                  key={exp.id}
                  className="flex justify-between items-center border-b py-2 border-gray-300 dark:border-gray-600 transition-colors duration-500"
                >
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.category} | {exp.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ₹{exp.amount}
                    </span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-500"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 border-t pt-3 flex justify-between text-lg font-semibold border-gray-300 dark:border-gray-600 transition-colors duration-500">
            <span>Total ({filter}):</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Charts */}
        {expenses.length > 0 && (
          <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-5xl transition-colors duration-500">
            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex-1 transition-colors duration-500">
              <h2 className="text-xl font-semibold mb-4 text-center">
                📊 Spending by Category
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                    isAnimationActive={true}
                    animationDuration={800}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex-1 transition-colors duration-500">
              <h2 className="text-xl font-semibold mb-4 text-center">
                📈 Monthly Spending
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke={darkMode ? "#fff" : "#000"} />
                  <YAxis stroke={darkMode ? "#fff" : "#000"} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="total"
                    fill="#00C49F"
                    name="Total ₹"
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
