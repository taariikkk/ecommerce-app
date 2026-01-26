import express from 'express';
import { createCategory, getCategories, deleteCategory } from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.delete('/:id', deleteCategory);
router.post('/', protect, adminOnly, createCategory);

export default router;
