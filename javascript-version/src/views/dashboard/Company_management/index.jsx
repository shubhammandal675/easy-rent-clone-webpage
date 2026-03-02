'use client'
import React, { useState } from 'react'
import CompanyList from './Company_Management_list'
import AddPage from './Addpage'
import EditPage from './EditPage'
import ViewPage from './ViewPage'

const CompanyManagement = () => {
  // Views: 'list', 'add', 'edit', 'view'
  const [view, setView] = useState('list') 
  const [selectedData, setSelectedData] = useState(null)

  // Function to handle Back to List
  const handleBack = () => {
    setView('list')
    setSelectedData(null)
  }

  return (
    <>
      {view === 'list' && (
        <CompanyList 
          onAdd={() => setView('add')} 
          onEdit={(data) => { setSelectedData(data); setView('edit'); }}
          onView={(data) => { setSelectedData(data); setView('view'); }}
        />
      )}

      {view === 'add' && <AddPage onBack={handleBack} />}
      
      {view === 'edit' && (
        <EditPage data={selectedData} onBack={handleBack} />
      )}

      {view === 'view' && (
        <ViewPage data={selectedData} onBack={handleBack} />
      )}
    </>
  )
}

export default CompanyManagement