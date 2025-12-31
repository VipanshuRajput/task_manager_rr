import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task= await Task.create({...req.body,createdBy: req.user._id,assignedTo: req.user._id});
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const query = {
    assignedTo: req.user._id
    
  };

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit);

  const count = await Task.countDocuments(query);

  res.json({
    tasks,
    page,
    pages: Math.ceil(count / limit)
  });
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

export const updateStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.status = task.status === "pending" ? "completed" : "pending";
  await task.save();
  res.json(task);
};

export const updatePriority = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.priority = req.body.priority;
  await task.save();
  res.json(task);
};
