// server/src/routes/productRoutes.js
import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, adminOnly, createProduct);

export default router;