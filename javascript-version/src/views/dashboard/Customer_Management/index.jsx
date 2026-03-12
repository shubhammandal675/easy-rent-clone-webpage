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

  // --- Fetch Customers ---
  const fetchCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers', { withCredentials: true });
      setCustomers(response.data);
    } catch (error) { 
      console.error("Error fetching Customers:", error); 
    }
  }

  useEffect(() => { fetchCustomer(); }, []);

  // --- Notification Handlers ---
  const handleCloseNotif = () => setNotification({ ...notification, open: false });

  const showMessage = (message, severity = 'error') => {
    setNotification({ open: true, message, severity });
  }

  // --- Handle Add Customer ---
const handleAdd = async (newData) => {
  try {
    const data = new FormData();
    data.append('firstName', newData.firstName);
    data.append('lastName', newData.lastName);
    data.append('email', newData.email);
    data.append('number', `${newData.countryCode} ${newData.number}`); // ← fix: "+91 9876543210"
    data.append('currency', newData.currency);
    data.append('language', newData.language);
    
    if (newData.profileImage) {
      data.append('profileImage', newData.profileImage);
    }

    const response = await axios.post('http://localhost:5000/api/customers', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (response.status === 201) {   
      showMessage("Customer Added Successfully! ✅", 'success');
      fetchCustomer();
      setView('list');
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Error saving customer";
    showMessage(errMsg, 'error'); 
    throw error; 
  }
}

// --- Handle Update Customer ---
const handleUpdate = async (updatedData) => {
  try {
    const data = new FormData();
    data.append('firstName', updatedData.firstName);
    data.append('lastName', updatedData.lastName);
    data.append('email', updatedData.email);
    data.append('number', `${updatedData.countryCode} ${updatedData.number}`); // ← fix: "+91 9876543210"
    data.append('currency', updatedData.currency);
    data.append('language', updatedData.language);
    
    if (updatedData.profileImage instanceof File) {
      data.append('profileImage', updatedData.profileImage);
    }

    const response = await axios.put(`http://localhost:5000/api/customers/${updatedData.id}`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (response.status === 200) {
      showMessage("Customer Updated Successfully! ✨", 'success');
      fetchCustomer();
      setView('list');
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Error updating customer";
    showMessage(errMsg, 'error');
    throw error;
  }
}

  // --- Handle Status Toggle (Active/Inactive) ---
  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`http://localhost:5000/api/customers/${id}/status`, 
        { status: newStatus }, 
        { withCredentials: true }
      );

      setCustomers(prev => prev.map(cust => 
        cust._id === id ? { ...cust, status: newStatus } : cust
      ));

      showMessage(`Customer is now ${newStatus ? 'Active' : 'Inactive'}`, 'success');
    } catch (error) {
      showMessage("Failed to update status", "error");
    }
  };

  // --- Handle Delete ---
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/customers/${id}`, { withCredentials: true });
      if (response.status === 200) {
        showMessage("Customer Deleted Successfully! 🗑️", 'success');
        fetchCustomer(); 
      }
    } catch (error) {
      showMessage("Error deleting customer", 'error');
    }
  }

  const handleAction = (mode, data = null) => {
    setSelectedCustomer(data);
    setView(mode);
  }

  // --- Render Logic ---
  return (
    <Box>
      {view === 'list' && (
        <Customer_Management_List 
          customers={customers} 
          onAction={handleAction} 
          onDelete={handleDelete} 
          onStatusToggle={handleStatusToggle} 
        />
      )}

      {view === 'add' && (
        <AddPage 
          onBack={() => setView('list')} 
          onAdd={handleAdd} 
          onError={showMessage} 
        />
      )}
      
      {view === 'edit' && (
        <EditPage 
          data={selectedCustomer} 
          onBack={() => setView('list')} 
          onUpdate={handleUpdate} 
          onError={showMessage} 
        />
      )} 
      
      {view === 'view' && (
        <ViewPage 
          data={selectedCustomer} 
          onBack={() => setView('list')} 
        />
      )}

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotif} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotif} 
          severity={notification.severity} 
          variant="filled" // Makes the error more visible
          sx={{ width: '100%', borderRadius: '8px' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Customer_Management_Main 