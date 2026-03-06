'use client'
import React, { useState } from 'react'
import Delivery_List from './Delivery_List'
import View_Delivery from './View_Delivery'

const Delivery_Management = () => {
  const [view, setView] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);

 const [orders, setOrders] = useState([
    { id: 'ER101', product: 'Premium Sofa', quantity: 5, price: '$2400', deliveryPartner: 'Arjun Singh', estimatedDate: '12 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER102', product: 'Office Chair', quantity: 10, price: '$1200', deliveryPartner: 'Vikram Mehta', estimatedDate: '14 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER103', product: 'Dining Table', quantity: 2, price: '$1500', deliveryPartner: 'Rohan Sharma', estimatedDate: '15 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER104', product: 'King Size Bed', quantity: 1, price: '$3500', deliveryPartner: 'Amit Verma', estimatedDate: '18 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER105', product: 'Study Desk', quantity: 4, price: '$800', deliveryPartner: 'Sameer Khan', estimatedDate: '20 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER106', product: 'Outdoor Swing', quantity: 3, price: '$1100', deliveryPartner: 'Sunny Gill', estimatedDate: '22 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER107', product: 'Modern Coffee Table', quantity: 2, price: '$450', deliveryPartner: 'Rahul Kapoor', estimatedDate: '24 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER108', product: 'Leather Recliner', quantity: 1, price: '$950', deliveryPartner: 'Suresh Raina', estimatedDate: '25 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER109', product: 'Bookshelf Unit', quantity: 3, price: '$600', deliveryPartner: 'Mohit Yadav', estimatedDate: '26 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER110', product: 'Nightstand Lamp', quantity: 6, price: '$180', deliveryPartner: 'Irfan Pathan', estimatedDate: '28 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER111', product: 'Wardrobe 3-Door', quantity: 1, price: '$1800', deliveryPartner: 'Kunal Kohli', estimatedDate: '30 Jan, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
    { id: 'ER112', product: 'Kitchen Island', quantity: 1, price: '$1250', deliveryPartner: 'Deepak Chahar', estimatedDate: '02 Feb, 2025', status: 'Placed', action: 'Assign Delivery Partner' },
]);

  return (
    <>
      {view === 'list' ? (
        <Delivery_List orders={orders} onView={(o) => { setSelectedOrder(o); setView('view'); }} />
      ) : (
        <View_Delivery order={selectedOrder} onBack={() => setView('list')} />
      )}
    </>
  )
}

export default Delivery_Management