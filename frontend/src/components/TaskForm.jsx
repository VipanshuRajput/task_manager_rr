import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createTaskObject } from "../utils/taskSchema";

export function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [expanded, setExpanded] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setExpanded(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (!dueDate) {
      alert("Please select a due date");
      return;
    }

    onSubmit(createTaskObject({ title, description, dueDate, priority }));
    resetForm();
  };

  return (
  <div className="card-elevated p-6 max-w-3xl mx-auto mt-10">
    <h3 className="text-lg font-semibold mb-4">Create New Task</h3>

    <input
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Task title..."
      value={title}
      onChange={e => setTitle(e.target.value)}
      onFocus={() => setExpanded(true)}
    />

    {expanded && (
      <div className="mt-4 space-y-4 animate-fade-up">
        <textarea
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[90px]"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="date"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />

          <select
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Add Task
          </button>

          <button
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    )}
  </div>
);

}
