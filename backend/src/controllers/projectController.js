import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    owner: req.user.id,
    members: [req.user.id],
  });
  res.status(201).json({ success: true, data: project });
};

export const getProjects = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "name email")
    .populate("members", "name email");
  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  res.json({ success: true, data: project });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  if (project.owner.toString() !== req.user.id)
    return res.status(403).json({ success: false, message: "Not authorized" });

  await project.deleteOne();
  res.json({ success: true, message: "Project deleted" });
};
