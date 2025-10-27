import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';

// Registracija
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Provjera da li korisnik već postoji
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash lozinke i kreiranje korisnika
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generisanje tokena
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, firstName, lastName, isAdmin: user.isAdmin },
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Pronađi korisnika
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Provjera lozinke
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generisanje tokena
    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin },
    });
  } catch (error) {
    next(error);
  }
};