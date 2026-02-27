'use client'

import React, { useState } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, Button, InputAdornment, MenuItem, Select, Tabs, Tab
} from '@mui/material'

const Notification_Management = () => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
    const [tabValue, setTabValue] = useState(1); // 1 for 'Received' as per screenshot

    // Realistic Dummy Data
    const [notifications] = useState([
        { id: '1', title: 'Title', description: 'Description', sent_to: 'abc@gmail.com', type: 'Broadcast', date_time: '01-01-2023', status: 'Active' },
        { id: '2', title: 'Title', description: 'Description', sent_to: 'abc@gmail.com', type: 'Broadcast', date_time: '01-01-2023', status: 'Inactive' },
        { id: '3', title: 'Title', description: 'Description', sent_to: 'abc@gmail.com', type: 'Individual', date_time: '01-01-2023', status: 'Active' },
        { id: '4', title: 'Title', description: 'Description', sent_to: 'abc@gmail.com', type: 'Individual', date_time: '01-01-2023', status: 'Inactive' },
    ]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4 }}>
            <Card sx={{ borderRadius: "15px", p: 5, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', backgroundColor: '#fff' }}>

                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: outfitFont, color: '#000' }}>
                        Notification Management
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont, fontWeight: 600 }}>
                        Add Notification
                    </Button>
                </Box>

                {/* Filters Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, '& .MuiInputBase-input': { fontFamily: outfitFont, fontSize: '0.9rem' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />

                    <Select
                        size="small"
                        defaultValue="Select Status"
                        sx={{ width: 180, borderRadius: '8px', fontFamily: outfitFont, color: '#666', fontSize: '0.9rem' }}
                    >
                        <MenuItem value="Select Status" disabled sx={{ fontFamily: outfitFont }}>Select Status</MenuItem>
                        <MenuItem value="Active" sx={{ fontFamily: outfitFont }}>Active</MenuItem>
                        <MenuItem value="Inactive" sx={{ fontFamily: outfitFont }}>Inactive</MenuItem>
                    </Select>

                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '8px' }}>
                        <i className="ri-arrow-up-down-line" style={{ fontSize: '1.1rem' }} />
                    </IconButton>

                    <Button sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>
                        Reset
                    </Button>
                </Box>

                {/* Tabs Section */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        TabIndicatorProps={{ style: { backgroundColor: '#787e7e5d', height: '3px' } }}
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontFamily: outfitFont,
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: '#999',
                                minWidth: 80
                            },
                            '& .Mui-selected': { color: '#000 !important' }
                        }}
                    >
                        <Tab label="Sent" />
                        <Tab label="Received" />
                    </Tabs>
                </Box>

                {/* Table Section */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Title', 'Description', 'Sent To', 'Type', 'Date/Time', 'Status', 'Action'].map((head) => (
                                    <TableCell
                                        key={head}
                                        align="left"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#8e98a8',
                                            fontSize: '0.75rem',
                                            fontFamily: outfitFont,
                                            padding: '16px', // 12px 16px feeling
                                            borderBottom: '1px solid #f0f2f5'
                                        }}
                                    >
                                        {head.toUpperCase()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notifications.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.id}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.title}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.description}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.sent_to}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.type}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.date_time}</TableCell>
                                    <TableCell align="left" sx={{ p: 4, fontFamily: outfitFont, fontSize: '0.85rem' }}>
                                        <Typography sx={{
                                            fontSize: '0.85rem',
                                            fontFamily: outfitFont,
                                            fontWeight: 500,
                                            // color: row.status === 'Active' ? '#4caf50' : '#ff9800' 
                                        }}>
                                            {row.status}
                                        </Typography>
                                    </TableCell >
                                    <TableCell align="left" sx={{ p: 2 }}>
                                        <IconButton size="small" sx={{ color: '#8e98a8' }}>
                                            <i className="ri-delete-bin-line" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                    <Button sx={{ bgcolor: '#9ee8eb', color: '#555', textTransform: 'none', borderRadius: '8px', height: 32, fontFamily: outfitFont, "&:hover": { bgcolor: '#86d2d5' } }}>
                        Previous
                    </Button>
                    <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontWeight: 600, fontFamily: outfitFont }}>
                        1
                    </Box>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#ddd', color: '#666', height: 32, fontFamily: outfitFont }}>
                        Next
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Notification_Management;     