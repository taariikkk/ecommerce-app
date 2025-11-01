// server/src/controllers/productController.js
import Product from '../models/Product.js';

// Svi proizvodi
export const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

// Dodaj proizvod (samo admin)
export const createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const product = await Product.create({ name, description, price, image, category });
  res.status(201).json(product);
};