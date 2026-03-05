'use client'
import React, { useState } from 'react'
import CategoryList from './CategoryList'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import ViewCategory from './ViewCategory'

const CategoryPage = () => {
  // Modal open/close status manage karne ke liye
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);
  
const [categories, setCategories] = useState([
  { id: 'CAT-001', name: 'Bakeware', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 10, deliveryComm: 5 },
  { id: 'CAT-002', name: 'Cutlery', status: 'Active', active: true, image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 12, deliveryComm: 8 },
  { id: 'CAT-003', name: 'Electronics', status: 'Active', active: true, image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 15, deliveryComm: 10 },
  { id: 'CAT-004', name: 'Home Decor', status: 'Active', active: true, image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 8, deliveryComm: 4 },
  { id: 'CAT-005', name: 'Furniture', status: 'Inactive', active: false, image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 20, deliveryComm: 15 },
  { id: 'CAT-006', name: 'Smartphones', status: 'Active', active: true, image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 18, deliveryComm: 7 },
  { id: 'CAT-007', name: 'Kitchenware', status: 'Active', active: true, image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 10, deliveryComm: 6 },
  { id: 'CAT-008', name: 'Garden Tools', status: 'Inactive', active: false, image: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 7, deliveryComm: 9 },
  { id: 'CAT-009', name: 'Office Supplies', status: 'Active', active: true, image: 'https://images.pexels.com/photos/66100/pexels-photo-66100.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 5, deliveryComm: 3 },
  { id: 'CAT-010', name: 'Bedding', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 12, deliveryComm: 10 },
  { id: 'CAT-011', name: 'Dinnerware', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6913380/pexels-photo-6913380.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 14, deliveryComm: 5 },
  { id: 'CAT-012', name: 'Appliances', status: 'Active', active: true, image: 'https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?auto=compress&cs=tinysrgb&w=150', productComm: 25, deliveryComm: 12 }
]);

  return (
    <>
      {/* CategoryList hamesha visible rahegi, tabhi background blur dikhega */}
      <CategoryList 
        categories={categories} 
        setCategories={setCategories}
        onAdd={() => setIsAddOpen(true)} 
        onEdit={(item) => { setSelectedItem(item); setIsEditOpen(true); }} 
        onView={(item) => { setSelectedItem(item); setIsViewOpen(true); }}
      />

      {/* Add Modal */}
      {isAddOpen && (
        <AddCategory 
          onBack={() => setIsAddOpen(false)} 
          setCategories={setCategories} 
        />
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <EditCategory 
          data={selectedItem} 
          onBack={() => setIsEditOpen(false)} 
          setCategories={setCategories} 
        />
      )}

      {/* View Modal */}
      {isViewOpen && (
        <ViewCategory 
          data={selectedItem} 
          onBack={() => setIsViewOpen(false)} 
        />
      )}
    </>
  )
}

export default CategoryPage;