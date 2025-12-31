import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/tasks",
    headers: { Authorization: `Bearer ${token}` }
  });

  const loadTasks = useCallback(async (page = 1) => {
    const res = await api.get(`?page=${page}`);
    setTasks(res.data.tasks);
    return res.data;
  }, []);

  const addTask = useCallback(async (data) => {
    await api.post("/", data);
  }, []);

  const updateTask = useCallback(async (id, data) => {
    await api.put(`/${id}`, data);
  }, []);

  const deleteTask = useCallback(async (id) => {
    await api.delete(`/${id}`);
  }, []);

  const toggleStatus = useCallback(async (id) => {
    await api.patch(`/${id}/status`);
  }, []);

  const changePriority = useCallback(async (id, priority) => {
    await api.patch(`/${id}/priority`, { priority });
  }, []);

  const getTaskById = useCallback((id) => {
    return tasks.find(t => t._id === id);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      loadTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleStatus,
      changePriority,
      getTaskById
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
