'use client'
import React, { useState } from 'react'
import Customer_Management_List from './Customer_Management_List'
import AddPage from './AddPage'
import EditPage from './EditPage'
import ViewPage from './ViewPage'

const Customer_Management_Main = () => {
  const [view, setView] = useState('list')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  
const [customers, setCustomers] = useState([
    { id: 1, name: 'test test', email: 'testuser5@mailinator.com', number: '+91 2464649916', status: true },
    { id: 2, name: 'Aman Kaur', email: 'aman@mailinator.com', number: '+91 9863214745', status: true },
    { id: 3, name: 'testingdev singh', email: 'promatics.davinder02@gmail.com', number: '+91 9143343434', status: true },
    { id: 4, name: 'customer first', email: 'promatics.aman13@gmail.com', number: '+91 9193456754', status: false },
    { id: 5, name: 'New Test Customer', email: 'customer1@gmail.com', number: '+91 9193876451', status: true },
    { id: 6, name: 'Retest Customer', email: 'testcustomer@gmail.com', number: '+91 9196347245', status: true },
    { id: 7, name: 'Rajan Prajapati', email: 'rajan@gmail.com', number: '+91 8787653334', status: true },
    { id: 8, name: 'Yash Kapoor', email: 'yash@gmail.com', number: '+91 9879879876', status: true },
    { id: 9, name: 'Arman Jaleel', email: 'arman@mailinator.com', number: '+91 9997865432', status: true },
    { id: 10, name: 'Yash Kapoor', email: 'yash2@mailinator.com', number: '+91 9998887776', status: true },
    { id: 11, name: 'Siddharth Malhotra', email: 'sid@gmail.com', number: '+91 9988776655', status: true },
    { id: 12, name: 'Priya Sharma', email: 'priya@mail.com', number: '+91 9876543210', status: true },
    { id: 13, name: 'Rahul Verma', email: 'rahul@verma.com', number: '+91 9123456789', status: true },
  ])


  const handleAction = (mode, data = null) => {
    setSelectedCustomer(data)
    setView(mode)
  }

  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
  }

  if (view === 'add') return <AddPage onBack={() => setView('list')} />
  if (view === 'edit') return <EditPage data={selectedCustomer} onBack={() => setView('list')} />
  if (view === 'view') return <ViewPage data={selectedCustomer} onBack={() => setView('list')} />

  return (
    <Customer_Management_List 
      customers={customers} 
      setCustomers={setCustomers}
      onAction={handleAction} 
      onDelete={handleDelete}
    />
  )
}
export default Customer_Management_Main