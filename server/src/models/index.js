import { sequelize } from '../config/db.js'; // ← iz config/db.js
import User from './User.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

// === ASOCIJACIJE ===
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, User, Product, Order, OrderItem };