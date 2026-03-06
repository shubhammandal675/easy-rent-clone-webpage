'use client'
import React, { useState } from 'react'
import { Box, Card } from '@mui/material'
import NotificationList from './NotificationList'
import AddNotificationModal from './AddNotification' 

const Notification_Management = () => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
    
   
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const [notifications, setNotifications] = useState([
        { id: '1', title: 'Title', description: 'Description', sent_to: 'abvhc@gmail.com', type: 'Broadcast', date_time: '01-01-2023', status: 'Active' },
        { id: '2', title: 'Title', description: 'Description', sent_to: 'ghbc@gmail.com', type: 'Broadcast', date_time: '05-01-2023', status: 'Inactive' },
        { id: '3', title: 'Title', description: 'Description', sent_to: 'hc@gmail.com', type: 'Broadcast', date_time: '09-01-2023', status: 'Active' },
        { id: '4', title: 'Title', description: 'Description', sent_to: 'bfxzc@gmail.com', type: 'Broadcast', date_time: '12-01-2023', status: 'Inactive' },
    ]);

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4 }}>
            <Card sx={{ borderRadius: "15px", p: 5, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', backgroundColor: '#fff' }}>
                
                
                <NotificationList
                    notifications={notifications}
                    setNotifications={setNotifications} 
                    onAddClick={() => setIsModalOpen(true)} 
                    outfitFont={outfitFont}
                />

               
                <AddNotificationModal
                    open={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    notifications={notifications}    
                    setNotifications={setNotifications} 
                    outfitFont={outfitFont}
                />

            </Card>
        </Box>
    )
}

export default Notification_Management;