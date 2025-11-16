import express from 'express';
import { getProducts, createProduct, getProductById, deleteProduct, updateProduct } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.post('/', protect, adminOnly, createProduct);

export default router;