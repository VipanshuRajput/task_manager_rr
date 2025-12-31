import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { PriorityColumn } from "../components/PriorityColumn";
import { TaskForm } from "../components/TaskForm";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";
import AppHeader from "../components/AppHeader";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { tasks, loadTasks, addTask } = useTasks();

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await loadTasks(currentPage);
      setPages(data.pages);
    }
    fetchData();
  }, [currentPage]);

  const handleCreateTask = async (taskData) => {
    await addTask(taskData);
    const data = await loadTasks(currentPage);
    setPages(data.pages);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <AppHeader />
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

    <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

      {/* Create Task */}
      <TaskForm onSubmit={handleCreateTask} />

      {/* Priority Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <PriorityColumn
          title="High Priority"
          color="priority-high"
          tasks={tasks.filter(t => t.priority === "high")}
        />

        <PriorityColumn
          title="Medium Priority"
          color="priority-medium"
          tasks={tasks.filter(t => t.priority === "medium")}
        />

        <PriorityColumn
          title="Low Priority"
          color="priority-low"
          tasks={tasks.filter(t => t.priority === "low")}
        />

      </div>

      {tasks.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No tasks yet. Create your first task above!
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={setCurrentPage}
      />

    </main>
  </div>
  </>
);

}
