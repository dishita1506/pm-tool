import Board from "../models/Board.js";

export const createBoard = async (req, res) => {
  const board = await Board.create(req.body);
  res.status(201).json({ success: true, data: board });
};

export const getBoards = async (req, res) => {
  const boards = await Board.find({ project: req.query.project });
  res.json({ success: true, data: boards });
};
