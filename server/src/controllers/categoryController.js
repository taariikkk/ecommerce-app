import Category from '../models/Category.js';

// Kreiraj novu kategoriju (samo admin)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Naziv je obavezan' });
    }
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Greška pri kreiranju kategorije', error });
  }
};

// Dohvati sve kategorije
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Greška pri dohvatanju kategorija', error });
  }
};