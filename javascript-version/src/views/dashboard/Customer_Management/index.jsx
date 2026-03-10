'use client'
import React, { useState, useEffect } from 'react'
import Customer_Management_List from './Customer_Management_List'
import AddPage from './AddPage'
import EditPage from './EditPage'
import ViewPage from './ViewPage'
import axios from "axios"
import { Box, Snackbar, Alert } from '@mui/material' 

const Customer_Management_Main = () => {
  const [view, setView] = useState('list')
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

  const fetchCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers', { withCredentials: true });
      setCustomers(response.data);
    } catch (error) { console.error("Error fetching Customers:", error); }
  }

  useEffect(() => { fetchCustomer(); }, []);

  const handleCloseNotif = () => setNotification({ ...notification, open: false });

  const showMessage = (message, severity = 'error') => {
    setNotification({ open: true, message, severity });
  }

  // Handle Add Customer
  const handleAdd = async (newData) => {
    try {
      const data = new FormData();
      data.append('firstName', newData.firstName);
      data.append('lastName', newData.lastName);
      data.append('email', newData.email);
      data.append('number', newData.number);
      data.append('currency', newData.currency);
      data.append('language', newData.language);
      data.append('profileImage', newData.profileImage);

      const response = await axios.post('http://localhost:5000/api/customers', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        setNotification({ open: true, message: "Customer Added Successfully! ✅", severity: 'success' });
        fetchCustomer();
        setView('list');
      }
    } catch (error) {
      setNotification({ open: true, message: "Error saving customer", severity: 'error' });
    }
  }

  // Handle Update Customer
  const handleUpdate = async (updatedData) => {
    try {
      const data = new FormData();
      data.append('firstName', updatedData.firstName);
      data.append('lastName', updatedData.lastName);
      data.append('email', updatedData.email);
      data.append('number', updatedData.number);
      data.append('currency', updatedData.currency);
      data.append('language', updatedData.language);
      
      if (updatedData.profileImage) {
        data.append('profileImage', updatedData.profileImage);
      }

      const response = await axios.put(`http://localhost:5000/api/customers/${updatedData.id}`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setNotification({ open: true, message: "Customer Updated Successfully! ✨", severity: 'success' });
        fetchCustomer();
        setView('list');
      }
    } catch (error) {
      setNotification({ open: true, message: "Error updating customer", severity: 'error' });
    }
  }

const handleStatusToggle = async (id, currentStatus) => {
  try {
    const newStatus = !currentStatus;
    
    // API Call to update backend
    await axios.patch(`http://localhost:5000/api/customers/${id}/status`, 
      { status: newStatus }, 
      { withCredentials: true }
    );

    // Update local state immediately so the SVG circle slides
    setCustomers(prev => prev.map(cust => 
      cust._id === id ? { ...cust, status: newStatus } : cust
    ));

    showMessage(`Customer is now ${newStatus ? 'Active' : 'Inactive'}`, 'success');
  } catch (error) {
    showMessage("Failed to update status", "error");
  }
};


  // NEW: Handle Delete Customer
const handleDelete = async (id) => {
    try {
      // Step 1: Send Delete request to backend
      const response = await axios.delete(`http://localhost:5000/api/customers/${id}`, { withCredentials: true });
      
      if (response.status === 200) {
        // Step 2: Show the Green Pop Message (Snackbar)
        showMessage("Customer Deleted Successfully! 🗑️", 'success');
        
        // Step 3: Refresh the list immediately
        fetchCustomer(); 
      }
    } catch (error) {
      // Show Red Pop Message if something goes wrong
      showMessage("Error deleting customer", 'error');
    }
  }

  const handleAction = (mode, data = null) => {
    setSelectedCustomer(data);
    setView(mode);
  }

  // --- View Logic ---
  if (view === 'add') return <AddPage onBack={() => setView('list')} onAdd={handleAdd} onError={showMessage} />
  
  if (view === 'edit') return <EditPage data={selectedCustomer} onBack={() => setView('list')} onUpdate={handleUpdate} onError={showMessage} /> 
  
  if (view === 'view') return <ViewPage data={selectedCustomer} onBack={() => setView('list')} />

  return (
  <Box>
      <Customer_Management_List 
        customers={customers} 
        onAction={handleAction} 
        onDelete={handleDelete} 
        onStatusToggle={handleStatusToggle} 
      />
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotif} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotif} 
          severity={notification.severity} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            backgroundColor: "#fff",
            color: '#000' 
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
export default Customer_Management_Main