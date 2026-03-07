'use client'
import React, { useState, useEffect } from 'react' // 1. useEffect add kiya
import CompanyList from './Company_Management_list'
import AddPage from './Addpage'
import EditPage from './EditPage'
import ViewPage from './ViewPage'

const CompanyManagement = () => {
  // 2. Initial State: Refresh par storage se view uthao, warna 'list'
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('management_view') || 'list';
    }
    return 'list';
  });

  const [selectedData, setSelectedData] = useState(null)

    // Dummy data
 const [companies, setCompanies] = useState([
        { id: 1, name: 'Ram kast', email: 'ram@grr.la', number: '+91 916754356435', status: 'ReApprove', active: true },
        { id: 2, name: 'Naman Sharma', email: 'naman.s@mailinator.com', number: '+91 3636363636', status: 'Buttons', active: true },
        { id: 3, name: 'Ohyod Kxhhd', email: 'ohyod.dev@testmail.com', number: '+91 2134994846', status: 'Buttons', active: false },
        { id: 4, name: 'Urban Rentals', email: 'contact@urbanrent.in', number: '+91 9876543210', status: 'Pending', active: true },
        { id: 5, name: 'Skyline Corp', email: 'info@skyline.com', number: '+91 6496494649', status: 'Pending', active: true },
        { id: 6, name: ' Gupta', email: 'gupta.h@mailinator.com', number: '+91 5946494346', status: 'ReApprove', active: false },
        { id: 7, name: 'Blue Wave Tech', email: 'support@bluewave.io', number: '+91 1234567896', status: 'Pending', active: true },
        { id: 8, name: 'Apex Logistics', email: 'admin@apexlog.com', number: '+91 11234567890', status: 'Buttons', active: true },
        { id: 9, name: 'Global Solutions', email: 'global@bizmail.com', number: '+91 3565959659', status: 'Pending', active: false },
        { id: 10, name: 'NexGen Media', email: 'hello@nexgen.com', number: '+91 9111111222', status: 'Pending', active: true },
        { id: 11, name: 'Priya Enterprises', email: 'priya.ent@yahoo.com', number: '+91 9988776655', status: 'ReApprove', active: true },
        { id: 12, name: 'Viking Traders', email: 'viking@trade.net', number: '+91 8877665544', status: 'Buttons', active: false },
        { id: 13, name: 'Swift Delivery', email: 'swift@delivery.com', number: '+91 7766554433', status: 'Pending', active: true }
    ]);

  // 3. Save View: Jab bhi view change ho, storage mein update karo
  useEffect(() => {
    sessionStorage.setItem('management_view', view);
  }, [view]);

  const handleBack = () => {
    sessionStorage.removeItem('management_view'); // List par jane par memory saaf
    setView('list')
    setSelectedData(null)
  }

  const handleDelete = (id) => {
    setCompanies(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      {view === 'list' && (
        <CompanyList 
          companies={companies}
          setCompanies={setCompanies}
          onAdd={() => setView('add')} 
          onEdit={(data) => { setSelectedData(data); setView('edit'); }}
          onView={(data) => { setSelectedData(data); setView('view'); }}
          onDelete={handleDelete}
        />
      )}

      {view === 'add' && (
        <AddPage 
          onBack={handleBack} 
          setCompanies={setCompanies} 
          companies={companies} 
        />
      )}
      
      {view === 'edit' && <EditPage data={selectedData} onBack={handleBack} setCompanies={setCompanies} />}
      {view === 'view' && <ViewPage data={selectedData} onBack={handleBack} />}
    </>
  )
}

export default CompanyManagement