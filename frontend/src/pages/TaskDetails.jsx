import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Pencil, CheckCircle, Trash2 } from "lucide-react";
import AppHeader from "../components/AppHeader";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [task, setTask] = useState(null);
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setTask(res.data);
    setTitle(res.data.title);
    setDescription(res.data.description);
    setDueDate(res.data.dueDate?.slice(0, 10));
    setPriority(res.data.priority);
  };

  const saveTask = async () => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title, description, dueDate, priority },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEdit(false);
    fetchTask();
  };

  const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;

    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/dashboard");
  };

  const toggleStatus = async () => {
    await axios.patch(
      `http://localhost:5000/api/tasks/${id}/status`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTask();
  };

  if (!task) return null;

  return (
    <>
    <ApppHeader />
    <div className="min-h-screen bg-background px-4 py-10">
      
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="card-elevated p-8 max-w-3xl mx-auto animate-fade-up">

        {edit ? (
          <div className="space-y-4">
            <input
              className="w-full rounded-lg border px-4 py-2 input-focus"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <textarea
              className="w-full rounded-lg border px-4 py-2 input-focus"
              rows="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="flex gap-3">
              <input
                type="date"
                className="rounded-lg border px-4 py-2 input-focus"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />

              <select
                className="rounded-lg border px-4 py-2 input-focus"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="bg-primary text-white px-5 py-2 rounded-lg" onClick={saveTask}>
                Save
              </button>
              <button className="border px-5 py-2 rounded-lg" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>

            <div className="flex gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm border priority-${task.priority}`}>
                {task.priority} priority
              </span>

              <span className="px-3 py-1 rounded-full text-sm bg-muted">
                {task.status}
              </span>
            </div>

            <p className="text-muted-foreground mb-4">{task.description}</p>

            <p className="text-sm mb-6">
              📅 Due: {new Date(task.dueDate).toDateString()}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="bg-primary text-white px-5 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setEdit(true)}
              >
                <Pencil size={16} /> Edit Task
              </button>

              <button
                className="border px-5 py-2 rounded-lg flex items-center gap-2"
                onClick={toggleStatus}
              >
                <CheckCircle size={16} /> Mark Completed
              </button>

              <button
                className="bg-destructive text-white px-5 py-2 rounded-lg flex items-center gap-2"
                onClick={deleteTask}
              >
                <Trash2 size={16} /> Delete Task
              </button>
            </div>
          </>
        )}

      </div>
    </div>
    </>
  );
}
