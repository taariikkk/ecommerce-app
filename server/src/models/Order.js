import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  stripePaymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // pending, paid, shipped, delivered
  },
}, {
  timestamps: true,
});

// Relacije
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;