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
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Proizvod nije pronađen' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Greška pri dohvatanju proizvoda', error });
  }
};

export const deleteProduct = async (req, res) => {
  try{
    const product = await Product.findByPk(req.params.id);
    if(!product){
      return res.status(401).json({ message: 'Proizvod nije pronađen' });
    }
    
    await product.destroy();
    res.json({ message: 'Product has been deleted' });
  } catch(error){
    res.status(500).json({ message: 'Greška pri brisanju proizvoda', error});
  }
};

export const updateProduct = async (req, res) => {
  try{
    const product = await Product.findByPk(req.params.id);
    if(!product){
      res.status(404).json({ message: 'Proizvod nije pronađen' });
    }

    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  } catch (error){
    res.status(500).json({ message: 'Greška pri ažuriranju proizvoda', error});
  }
};