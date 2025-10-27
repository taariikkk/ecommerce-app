import express from 'express';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json()); // Ovo je ključno za parsiranje JSON body-ja

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;