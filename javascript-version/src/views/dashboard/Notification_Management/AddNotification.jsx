'use client'
import React, { useState } from 'react'
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Box, IconButton, MenuItem, Select, Typography 
} from '@mui/material'

const AddNotificationModal = ({ open, handleClose, notifications, setNotifications, outfitFont }) => {
    // --- Form States ---
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Select Type',
        user: 'Select User'
    });

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Form Submit Handler
    const handleAdd = () => {
        // Basic Validation
        if (formData.title === '' || formData.type === 'Select Type') {
            alert("Please fill Title and Type");
            return;
        }

        // Naya data object banana
        const newNotification = {
            id: String(notifications.length + 1), // Simple ID logic
            title: formData.title,
            description: formData.description,
            sent_to: formData.user === 'Select User' ? 'All Users' : formData.user,
            type: formData.type,
            date_time: new Date().toLocaleDateString('en-GB'), // Aaj ki date
            status: 'Active'
        };

        // Table update karna
        setNotifications([newNotification, ...notifications]);

        // Form reset aur modal close
        setFormData({ title: '', description: '', type: 'Select Type', user: 'Select User' });
        handleClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{ sx: { borderRadius: '15px', p: 1 } }}
        >
            {/* Header */}
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: outfitFont }}>
                    Add Notification
                </Typography>
                <IconButton onClick={handleClose} size="small">
                    <i className="ri-close-line"></i>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {/* Title */}
                    <Box>
                        <Typography sx={{ mb: 0.5, fontSize: '0.85rem', fontWeight: 600, fontFamily: outfitFont }}>Title</Typography>
                        <TextField 
                            fullWidth size="small" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title" 
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} 
                        />
                    </Box>

                    {/* Description */}
                    <Box>
                        <Typography sx={{ mb: 0.5, fontSize: '0.85rem', fontWeight: 600, fontFamily: outfitFont }}>Description</Typography>
                        <TextField 
                            fullWidth size="small" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description" 
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} 
                        />
                    </Box>

                    {/* Type Dropdown */}
                    <Box>
                        <Typography sx={{ mb: 0.5, fontSize: '0.85rem', fontWeight: 600, fontFamily: outfitFont }}>Type</Typography>
                        <Select 
                            fullWidth size="small" 
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            sx={{ borderRadius: '8px' }}
                        >
                            <MenuItem value="Select Type" disabled>Select Type</MenuItem>
                            <MenuItem value="Broadcast">Broadcast</MenuItem>
                            <MenuItem value="Individual">Individual</MenuItem>
                        </Select>
                    </Box>

                    {/* User Dropdown */}
                    <Box>
                        <Typography sx={{ mb: 0.5, fontSize: '0.85rem', fontWeight: 600, fontFamily: outfitFont }}>User</Typography>
                        <Select 
                            fullWidth size="small" 
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            sx={{ borderRadius: '8px' }}
                        >
                            <MenuItem value="Select User" disabled>Select User</MenuItem>
                            <MenuItem value="User 1">User 1</MenuItem>
                            <MenuItem value="User 2">User 2</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </DialogContent>

            {/* Bottom Buttons */}
            <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 1 }}>
                <Button 
                    onClick={handleAdd} 
                    variant="contained" 
                    sx={{ bgcolor: '#00cfd5', color: '#fff', textTransform: 'none', borderRadius: '8px', px: 4, '&:hover': { bgcolor: '#00b8bc' } }}
                >
                    Add
                </Button>
                <Button 
                    onClick={handleClose} 
                    variant="outlined" 
                    sx={{ color: '#666', borderColor: '#ddd', textTransform: 'none', borderRadius: '8px', px: 3 }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddNotificationModal;