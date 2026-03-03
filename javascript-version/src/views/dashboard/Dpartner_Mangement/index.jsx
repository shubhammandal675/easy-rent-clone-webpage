'use client'
import React, { useState } from 'react'
import Dpartner_Management_list from './Dpartner_Management_list'
import Addpage from './Addpage'
import EditPage from './EditPage' // Agar aapne banaya ho
import ViewPage from './ViewPage' // Agar aapne banaya ho

const Dpartner_Management = () => {
  // Views: 'list', 'add', 'edit', 'view'
  const [view, setView] = useState('list') 
  const [selectedData, setSelectedData] = useState(null)

  // Centralized State for Partners
 const [partners, setPartners] = useState([
    { id: 1, name: 'Zippy Logistics', email: 'contact@zippy.in', number: '+91 9876501234', status: 'Approved', active: true },
    { id: 2, name: 'Flash Delivery', email: 'support@flash.com', number: '+91 8822334455', status: 'Approved', active: true },
    { id: 3, name: 'Urban Express', email: 'admin@urbanex.io', number: '+91 7011223344', status: 'Pending', active: false },
    { id: 4, name: 'Swift Move', email: 'swift@delivery.net', number: '+91 9123456789', status: 'Approved', active: true },
    { id: 5, name: 'Blue Dart Plus', email: 'info@bluedart.in', number: '+91 9988776655', status: 'Pending', active: true },
    { id: 6, name: 'Courier Pro', email: 'hello@procourier.com', number: '+91 8447755663', status: 'Approved', active: false },
    { id: 7, name: 'Quick Ship', email: 'ops@quickship.com', number: '+91 9555443322', status: 'Pending', active: true },
    { id: 8, name: 'Metro Riders', email: 'metro@riders.co', number: '+91 7888999000', status: 'Approved', active: true },
    { id: 9, name: 'Falcon Cargo', email: 'falcon@cargo.com', number: '+91 6333221100', status: 'Pending', active: false },
    { id: 10, name: 'Green Mile', email: 'eco@greenmile.in', number: '+91 9000111222', status: 'Approved', active: true },

  ]);

  const handleBack = () => {
    setView('list')
    setSelectedData(null)
  }

  const handleDelete = (id) => {
    setPartners(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      {view === 'list' && (
        <Dpartner_Management_list 
          partners={partners}
          setPartners={setPartners}
          onAdd={() => setView('add')} 
          onEdit={(data) => { setSelectedData(data); setView('edit'); }}
          onView={(data) => { setSelectedData(data); setView('view'); }}
          onDelete={handleDelete}
        />
      )}

      {view === 'add' && <Addpage onBack={handleBack} />}
      
      {view === 'edit' && (
        <EditPage data={selectedData} onBack={handleBack} />
      )}

      {view === 'view' && (
        <ViewPage data={selectedData} onBack={handleBack} />
      )}
    </>
  )
}

export default Dpartner_Management