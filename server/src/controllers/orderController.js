import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    const userId = req.user.id;

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Proizvod sa ID ${item.productId} ne postoji` });
      }

      const price = product.price;
      const quantity = item.quantity || 1;

      totalPrice += price * quantity;

      orderItems.push({
        productId: product.id,
        quantity,
        price,
      });
    }

    // Kreiraj narudžbu
    const order = await Order.create({
      userId,
      totalPrice,
    });

    // Dodaj stavke
    const createdItems = await OrderItem.bulkCreate(
      orderItems.map(item => ({ ...item, orderId: order.id }))
    );

    // Vrati narudžbu sa stavkama
    const orderWithItems = await Order.findByPk(order.id, {
      include: [
        { model: OrderItem, include: [Product] }
      ]
    });

    res.status(201).json(orderWithItems);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};