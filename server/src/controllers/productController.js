import { Op } from 'sequelize';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
export const getProducts = async (req, res, next) => {
  try {
    const { categoryId, search, sortBy } = req.query;

    // 1. Filtriranje (WHERE)
    const whereClause = {};

    // Ako imamo categoryId
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    // Ako imamo search (Pretraga po imenu)
    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    // 2. Sortiranje (ORDER BY)
    let orderClause = [['createdAt', 'DESC']];

    if (sortBy === 'price_asc') {
      orderClause = [['price', 'ASC']]; // Najjeftinije
    } else if (sortBy === 'price_desc') {
      orderClause = [['price', 'DESC']]; // Najskuplje
    } else if (sortBy === 'name_asc') {
      orderClause = [['name', 'ASC']]; // A-Z
    }

    const products = await Product.findAll({
      where: whereClause,
      order: orderClause,
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Dodaj proizvod (samo admin)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, categoryId } = req.body;
    
    const product = await Product.create({
      name,
      description,
      price,
      image,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Dohvati jedan proizvod po ID-u
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
        include: [{
            model: Category,
            attributes: ['id', 'name']
        }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Proizvod nije pronađen' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Obriši proizvod
export const deleteProduct = async (req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.id);
    if(!product){
      return res.status(404).json({ message: 'Proizvod nije pronađen' });
    }
    
    await product.destroy();
    res.json({ message: 'Product has been deleted' });
  } catch(error){
    next(error);
  }
};

// Ažuriraj proizvod
export const updateProduct = async (req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.id);
    if(!product){
      return res.status(404).json({ message: 'Proizvod nije pronađen' });
    }

    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  } catch (error){
    next(error);
  }
};