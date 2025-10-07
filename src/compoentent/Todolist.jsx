import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Persist todos & theme
  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAdd = () => {
    if (task.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = {
        ...updated[editIndex],
        text: task,
        category,
        priority,
      };
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([
        ...todos,
        {
          text: task,
          completed: false,
          category,
          priority,
          created: new Date().toLocaleString(),
        },
      ]);
    }
    setTask("");
  };

  const toggleComplete = (i) => {
    const updated = [...todos];
    updated[i].completed = !updated[i].completed;
    setTodos(updated);
  };
  const handleDelete = (i) => setTodos(todos.filter((_, x) => x !== i));
  const handleEdit = (i) => {
    const t = todos[i];
    setTask(t.text);
    setCategory(t.category);
    setPriority(t.priority);
    setEditIndex(i);
  };
  const clearCompleted = () => setTodos(todos.filter((t) => !t.completed));

  const filteredTodos = todos.filter((t) => {
    const matchSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All"
        ? true
        : filter === "Completed"
        ? t.completed
        : !t.completed;
    return matchSearch && matchFilter;
  });

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-blue-100 to-blue-300"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border transition-all duration-500 ${
          darkMode
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">📝 To-Do List</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-2xl transition hover:scale-110"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task..."
            className={`px-3 py-2 rounded-lg focus:outline-none transition ${
              darkMode
                ? "bg-white/20 text-white placeholder-gray-300"
                : "bg-gray-100 text-gray-800 placeholder-gray-500"
            }`}
          />
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`flex-1 px-2 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
              <option>Shopping</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`flex-1 px-2 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition active:scale-95"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className={`flex-grow px-3 py-2 rounded-lg mr-2 focus:outline-none transition ${
              darkMode
                ? "bg-white/20 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-800 placeholder-gray-500"
            }`}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-3 py-2 rounded-lg transition ${
              darkMode ? "bg-white/20 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Stats */}
        <div
          className={`text-sm mb-3 flex justify-between ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p>Total: {total}</p>
          <p>✅ {completed}</p>
          <p>🕒 {pending}</p>
        </div>

        {/* List */}
        <ul className="space-y-2">
          <AnimatePresence>
            {filteredTodos.map((todo, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 rounded-lg shadow-sm border transition ${
                  darkMode
                    ? "bg-white/10 border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <div
                  onClick={() => toggleComplete(i)}
                  className={`cursor-pointer ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  <span className="font-semibold">{todo.text}</span>
                  <div className="text-xs opacity-70">
                    {todo.category} • {todo.priority} • {todo.created}
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-yellow-400 hover:scale-110 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-400 hover:scale-110 transition"
                  >
                    🗑️
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
          {filteredTodos.length === 0 && (
            <p
              className={`text-center text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No tasks found.
            </p>
          )}
        </ul>

        {/* Clear Button */}
        {completed > 0 && (
          <button
            onClick={clearCompleted}
            className="mt-5 w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition active:scale-95"
          >
            Clear Completed Tasks
          </button>
        )}
      </div>
    </div>
  );
}
