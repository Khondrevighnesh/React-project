import React, { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Add or update task
  const handleAdd = () => {
    if (task.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = task;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask("");
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  // Delete task
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Edit task
  const handleEdit = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          📝 To-Do List
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* To-Do List */}
        <ul className="space-y-2">
          {todos.length === 0 && (
            <p className="text-gray-400 text-center">No tasks yet.</p>
          )}
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white/10 px-4 py-2 rounded-lg shadow-sm"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`flex-grow cursor-pointer text-white ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
