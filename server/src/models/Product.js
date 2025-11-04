import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import OrderItem from './OrderItem.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Product.hasMany(OrderItem, { foreignKey: 'productId' });

export default Product;