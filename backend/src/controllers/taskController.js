import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    activity: [{ action: "Task created", user: req.user.id }],
  });
  res.status(201).json({ success: true, data: task });
};

export const getTasks = async (req, res) => {
  const { board, status, priority, assignedTo } = req.query;
  const query = { board };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;

  const tasks = await Task.find(query)
    .populate("assignedTo", "name email")
    .populate("activity.user", "name");

  res.json({ success: true, data: tasks });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Fetch current task to compare old values
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  // Atomic activity logging (no race condition)
  if (req.body.status && req.body.status !== task.status) {
    updateData.$push = updateData.$push || {};
    updateData.$push.activity = {
      action: `Status changed to ${req.body.status}`,
      user: req.user.id,
    };
  }
  if (
    req.body.assignedTo &&
    req.body.assignedTo !== task.assignedTo?.toString()
  ) {
    updateData.$push = updateData.$push || {};
    updateData.$push.activity = {
      action: "Assigned to user",
      user: req.user.id,
    };
  }

  // Perform atomic update
  const updated = await Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("assignedTo", "name")
    .populate("activity.user", "name");

  res.json({ success: true, data: updated });
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Task deleted" });
};
