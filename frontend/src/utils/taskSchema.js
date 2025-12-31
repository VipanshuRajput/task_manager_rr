export const PRIORITIES = ["low", "medium", "high"];
export const STATUSES = ["pending", "completed"];

export const createTaskObject = ({ title, description, dueDate, priority }) => ({
  title,
  description,
  dueDate,
  priority,
  status: "pending",
  createdAt: new Date()
});
