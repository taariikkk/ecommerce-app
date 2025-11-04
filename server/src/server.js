import app from './app.js';
import './models/index.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const { sequelize } = await import('./models/index.js');
    
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ force: false });
    console.log('Database synced!');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();