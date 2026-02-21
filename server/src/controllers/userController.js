import { hash } from 'bcrypt';
import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';

export const getUserProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: {exclude: ['password']}
    });
    if (user){
        res.json(user);
    } else {
        res.status(400).json({ message: 'User not found'})
    }
};

export const updateUserProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        if (req.body.password){
            user.password = await hashPassword(req.body.password);
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(400).json({ message: 'User not found' })
    }
};