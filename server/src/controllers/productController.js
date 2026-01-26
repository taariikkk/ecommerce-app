import Product from '../models/Product.js';
import Category from '../models/Category.js';
export const getProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.query; 

    const whereClause = {};
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const products = await Product.findAll({
      where: whereClause,
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