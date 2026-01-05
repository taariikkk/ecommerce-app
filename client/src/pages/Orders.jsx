import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../api/orderApi';
import Loader from '../components/Loader';
import { formatCurrency } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (error) {
        console.error('Greška pri dohvatanju narudžbi', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) return <Loader />;

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Nemate narudžbi</h2>
        <Link to="/" className="text-blue-600 hover:underline">Započnite kupovinu</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Moje Narudžbe</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Narudžba ID: <span className="font-bold text-gray-800">#{order.id}</span></p>
                <p className="text-sm text-gray-500">Datum: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{formatCurrency(order.totalPrice)}</p>
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {order.items && order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.Product ? item.Product.name : 'Proizvod'} x {item.quantity}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;