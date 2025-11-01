import express from 'express';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(express.json()); // Ovo je ključno za parsiranje JSON body-ja

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;