import app from './app.js';
import { sequelize } from './config/db.js'; // Importujemo Sequelize za DB

const PORT = process.env.PORT || 5000;

// Pokretanje servera nakon DB konekcije
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Provjera konekcije sa bazom
    console.log('Database connected successfully.');
    await sequelize.sync({ force: false }); // Sinhronizacija modela (force: false da ne briše podatke)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();