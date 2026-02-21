import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;