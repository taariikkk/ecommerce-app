import { sequelize } from './src/config/db.js';
import User from './src/models/User.js';
import { hashPassword } from './src/utils/hashPassword.js';

const createAdmin = async() => {
    try{
        await sequelize.authenticate();
        const hashed = await hashPassword('admin123');
        await User.findOrCreate({
            where: { email: 'admin@shop.ba' },
            defaults: {
                email: 'admin@shop.ba',
                password: hashed,
                firstName: 'Super',
                lastName: 'Admin',
                isAdmin: true,
            },
        });
        console.log('Admin is created!');
        process.exit();
    } catch (error){
        console.error(error);
    }
};

createAdmin();