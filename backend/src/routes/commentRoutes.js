import express from "express";
const router = express.Router();
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Task comment APIs
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/", protect, createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/", protect, getComments);

export default router;
