import express from 'express';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/categories', categoryRoutes);

app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;