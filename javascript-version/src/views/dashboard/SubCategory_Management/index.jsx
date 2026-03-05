'use client'
import React, { useState } from 'react'
import SubCategory_List from './SubCategory_List'
import Add_SubCategory from './Add_SubCategory'
import Edit_SubCategory from './Edit_SubCategory'
import SubCategory_View from './SubCategory_View'

const SubCategory_Management = () => {
  // ERROR FIX: Ye saari state ab component function ke andar hai
  const [subCategories, setSubCategories] = useState([
    { id: 'SUB-015', category: 'Dinnerware', subCategory: 'Ceramic Plates', status: 'Active', active: true, image: 'https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-014', category: 'Cutlery', subCategory: 'Silverware Set', status: 'Active', active: true, image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-013', category: 'Bakeware', subCategory: 'Silicon Molds', status: 'Inactive', active: false, image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-012', category: 'Table Accessories', subCategory: 'Linen Napkins', status: 'Active', active: true, image: 'https://images.pexels.com/photos/7174453/pexels-photo-7174453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-011', category: 'Dinnerware', subCategory: 'Glass Bowls', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6508357/pexels-photo-6508357.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-010', category: 'Cookware', subCategory: 'Non-stick Pans', status: 'Active', active: true, image: 'https://images.pexels.com/photos/4551906/pexels-photo-4551906.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-009', category: 'Cutlery', subCategory: 'Steak Knives', status: 'Inactive', active: false, image: 'https://images.pexels.com/photos/5490336/pexels-photo-5490336.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-008', category: 'Bakeware', subCategory: 'Baking Sheets', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-007', category: 'Table Accessories', subCategory: 'Coasters', status: 'Active', active: true, image: 'https://images.pexels.com/photos/4264049/pexels-photo-4264049.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-006', category: 'Dinnerware', subCategory: 'Soup Tureens', status: 'Active', active: true, image: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-005', category: 'Cookware', subCategory: 'Pressure Cookers', status: 'Active', active: true, image: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-004', category: 'Electronics', subCategory: 'Oven Toasters', status: 'Inactive', active: false, image: 'https://images.pexels.com/photos/211718/pexels-photo-211718.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-003', category: 'Table Accessories', subCategory: 'Table Runners', status: 'Active', active: true, image: 'https://images.pexels.com/photos/7174453/pexels-photo-7174453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-002', category: 'Bakeware', subCategory: 'Baking Dishes', status: 'Active', active: true, image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 'SUB-001', category: 'Bakeware', subCategory: 'Ramekins', status: 'Active', active: true, image: 'https://images.pexels.com/photos/4551906/pexels-photo-4551906.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ]);

  const [view, setView] = useState('list'); 
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      {view === 'list' && (
        <SubCategory_List 
          subCategories={subCategories} 
          setSubCategories={setSubCategories} 
          onAdd={() => setView('add')}
          onEdit={(item) => { setSelectedItem(item); setView('edit'); }}
          onView={(item) => { setSelectedItem(item); setView('view'); }}
        />
      )}

      {view === 'add' && <Add_SubCategory onBack={() => setView('list')} setSubCategories={setSubCategories} />}
      {view === 'edit' && <Edit_SubCategory data={selectedItem} onBack={() => setView('list')} setSubCategories={setSubCategories} />}
      {view === 'view' && <SubCategory_View data={selectedItem} onBack={() => setView('list')} />}
    </>
  )
}

export default SubCategory_Management