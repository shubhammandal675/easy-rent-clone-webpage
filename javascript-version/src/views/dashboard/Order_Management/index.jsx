'use client'
import React, { useState } from 'react'
import Order_List from './Order_List'
import View_Order from './View_Order' // Make sure you have created this file

const Order_Management = () => {
  const [view, setView] = useState('list'); // 'list' or 'view'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    { id: 'ORDI-000001', product: 'Vsvsv', quantity: 2, price: '€ 12', deliveryType: 'Company delivery', status: 'Pending Payment' },
    { id: 'ORDI-000002', product: 'Butter dish', quantity: 1, price: '€ 120', deliveryType: 'Self pickup', status: 'Confirmed' },
    { id: 'ORDI-000003', product: 'Baking', quantity: 3, price: '€ 36', deliveryType: 'Event hero delivery', status: 'Ready for Delivery' },
    { id: 'ORDI-000004', product: 'White cupa', quantity: 2, price: '€ 20', deliveryType: 'Self pickup', status: 'Out of Delivery' },
    { id: 'ORDI-000005', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Company delivery', status: 'Delivered' },
    { id: 'ORDI-000006', product: 'Salad Bowls', quantity: 5, price: '€ 50', deliveryType: 'Self pickup', status: 'Ongoing' },
    { id: 'ORDI-000007', product: 'Cutlery Set', quantity: 1, price: '€ 15', deliveryType: 'Company delivery', status: 'Return Requested' },
    { id: 'ORDI-000008', product: 'Baking Tray', quantity: 2, price: '€ 40', deliveryType: 'Event hero delivery', status: 'Returned' },
    { id: 'ORDI-000009', product: 'Dinnerware', quantity: 4, price: '€ 200', deliveryType: 'Self pickup', status: 'Completed' },
    { id: 'ORDI-000010', product: 'Vsvsv', quantity: 1, price: '€ 12', deliveryType: 'Company delivery', status: 'Cancelled' },
    { id: 'ORDI-000011', product: 'Butter dish', quantity: 1, price: '€ 120', deliveryType: 'Self pickup', status: 'Pending Payment' },
    { id: 'ORDI-000012', product: 'Baking', quantity: 2, price: '€ 12', deliveryType: 'Self pickup', status: 'Confirmed' },
    { id: 'ORDI-000013', product: 'Vsvsv', quantity: 1, price: '€ 12', deliveryType: 'Event hero delivery', status: 'Ready for Delivery' },
    { id: 'ORDI-000014', product: 'Rakmin A', quantity: 2, price: '€ 40', deliveryType: 'Company delivery', status: 'Out of Delivery' },
    { id: 'ORDI-000015', product: 'Butter dish', quantity: 1, price: '€ 120', deliveryType: 'Company delivery', status: 'Delivered' },
    { id: 'ORDI-000016', product: 'White cupa', quantity: 6, price: '€ 60', deliveryType: 'Self pickup', status: 'Ongoing' },
    { id: 'ORDI-000017', product: 'Baking', quantity: 1, price: '€ 10', deliveryType: 'Self pickup', status: 'Return Requested' },
    { id: 'ORDI-000018', product: 'Butter dish', quantity: 1, price: '€ 120', deliveryType: 'Self pickup', status: 'Returned' },
    { id: 'ORDI-000019', product: 'Vsvsv', quantity: 4, price: '€ 48', deliveryType: 'Event hero delivery', status: 'Completed' },
    { id: 'ORDI-000020', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Event hero delivery', status: 'Cancelled' },
    { id: 'ORDI-000021', product: 'Baking', quantity: 2, price: '€ 12', deliveryType: 'Event hero delivery', status: 'Pending Payment' },
    { id: 'ORDI-000022', product: 'Vsvsv', quantity: 1, price: '€ 12', deliveryType: 'Self pickup', status: 'Confirmed' },
    { id: 'ORDI-000023', product: 'Salad Bowls', quantity: 2, price: '€ 20', deliveryType: 'Self pickup', status: 'Ready for Delivery' },
    { id: 'ORDI-000024', product: 'White cupa', quantity: 2, price: '€ 10', deliveryType: 'Self pickup', status: 'Out of Delivery' },
    { id: 'ORDI-000025', product: 'Vsvsv', quantity: 1, price: '€ 12', deliveryType: 'Self pickup', status: 'Delivered' },
    { id: 'ORDI-000026', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Self pickup', status: 'Ongoing' },
    { id: 'ORDI-000027', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Company delivery', status: 'Return Requested' },
    { id: 'ORDI-000028', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Company delivery', status: 'Returned' },
    { id: 'ORDI-000029', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Company delivery', status: 'Completed' },
    { id: 'ORDI-000030', product: 'Rakmin A', quantity: 1, price: '€ 20', deliveryType: 'Company delivery', status: 'Cancelled' },
  ]);

  // Handle viewing an order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setView('view');
  };

  return (
    <>
      {view === 'list' ? (
        <Order_List 
          orders={orders} 
          onView={handleViewOrder} 
        />
      ) : (
        <View_Order 
          order={selectedOrder} 
          onBack={() => setView('list')} 
        />
      )}
    </>
  )
}

export default Order_Management