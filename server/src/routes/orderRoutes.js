import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Sve rute zaštićene

router.post('/', createOrder);
router.get('/', getUserOrders);

export default router;