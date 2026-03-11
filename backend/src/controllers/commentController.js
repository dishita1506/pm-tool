import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  const comment = await Comment.create({
    task: req.body.task,
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
};
export const getComments = async (req, res) => {
  const comments = await Comment.find({ task: req.query.task })
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: comments });
};
