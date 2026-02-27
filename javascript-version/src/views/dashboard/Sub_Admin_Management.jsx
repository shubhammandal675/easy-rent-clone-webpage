'use client'

import React, { useState } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, Button, InputAdornment, MenuItem, Select
} from '@mui/material'

const Sub_Admin_Management = () => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

    // Dummy Data
    const [admins] = useState([
        { id: 'ER101', image: '', name: 'Mahesh', email: 'Mahesh@gmail.com', number: '1234567890', permissions: 'All', status: 'Active' },
    ]);

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4 }}>
            <Card sx={{ borderRadius: "15px", p: 5, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', backgroundColor: '#fff' }}>

                {/* Header Section: Title and Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: outfitFont, color: '#000' }}>
                        Sub-Admin Management
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>
                            Import
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>
                            Export
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>
                            Add Sub-Admin
                        </Button>
                    </Box>
                </Box>

                {/* Filters Section: Aligned with Heading */}
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

                {/* Table Section: Compact with 12px 16px Padding */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Image', 'Name', 'Email', 'Number', 'Permissions', 'Status', 'Action'].map((head) => (
                                    <TableCell key={head} align="center" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', fontFamily: outfitFont, padding: '12px 16px', borderBottom: '1px solid #f0f2f5' }}>
                                        {head.toUpperCase()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.id}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                                        <Box sx={{ width: 35, height: 35, borderRadius: '50%', bgcolor: '#e0e0e0', margin: 'auto' }} />
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.name}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.email}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.number}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.permissions}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#4caf50' }}>{row.status}</TableCell>
                                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                                        <IconButton size="small" sx={{ color: '#8e98a8' }}>
                                            <i className="ri-eye-line" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                    <Button sx={{ bgcolor: '#9ee8eb', color: '#555', textTransform: 'none', borderRadius: '8px', height: 32, fontFamily: outfitFont }}>Previous</Button>
                    <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontWeight: 600, fontFamily: outfitFont }}>1</Box>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#ddd', color: '#666', height: 32, fontFamily: outfitFont }}>Next</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Sub_Admin_Management;