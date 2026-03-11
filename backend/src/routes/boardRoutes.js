import express from "express";
const router = express.Router();
import { createBoard, getBoards } from "../controllers/boardController.js";
/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Kanban board APIs
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Board created
 */
router.post("/", createBoard);

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 */
router.get("/", getBoards);

export default router;
