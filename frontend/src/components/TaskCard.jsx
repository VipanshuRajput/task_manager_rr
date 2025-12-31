import { format } from "date-fns";
import { Calendar, CheckCircle2, Clock } from "lucide-react";

export function TaskCard({ task, onToggleStatus, onChangePriority, onOpen }) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status === "pending";

  return (
    <div
      onClick={onOpen}
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        opacity: task.status === "completed" ? 0.6 : 1
      }}
    >
      <h4 style={{
        margin: 0,
        textDecoration: task.status === "completed" ? "line-through" : "none"
      }}>
        {task.title}
      </h4>

      <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, fontSize: 12, color: isOverdue ? "#dc2626" : "#555" }}>
          <Calendar size={14} />
          {task.dueDate && format(new Date(task.dueDate), "MMM d, yyyy")}
        </div>

        <div style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          fontSize: 12,
          padding: "2px 8px",
          borderRadius: 20,
          background: task.status === "completed" ? "#dcfce7" : "#fef3c7"
        }}>
          {task.status === "completed" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
          {task.status}
        </div>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button onClick={(e) => { e.stopPropagation(); onToggleStatus(task._id); }}>
          Toggle Status
        </button>

        <select
          value={task.priority}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChangePriority(task._id, e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}
