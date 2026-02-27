'use client'

import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment, Tabs, Tab
} from '@mui/material'

const Rating_Management = () => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Dummy Data for 3 Tabs (6 entries each as per your requirement)
    const ratingsData = {
        product: [
            { id: 1, name: 'Sofa', rating: '2.5/5', review: 'Good comfort but delivery was late' },
            { id: 2, name: 'Dining Table', rating: '4.0/5', review: 'Sturdy build and looks premium' },
            { id: 3, name: 'Office Chair', rating: '4.5/5', review: 'Very comfortable for long working hours' },
            { id: 4, name: 'King Bed', rating: '3.0/5', review: 'Average quality, mattress could be better' },
            { id: 5, name: 'Study Table', rating: '5.0/5', review: 'Excellent finish and very spacious' },
            { id: 6, name: 'Bookshelf', rating: '3.5/5', review: 'Assembly was difficult but product is good' },
        ],
        vendor: [
            { id: 1, name: 'Harry', rating: '2.5/5', review: 'Good behavior but slow response' },
            { id: 2, name: 'Jhon', rating: '4.0/5', review: 'Very professional and helpful' },
            { id: 3, name: 'Marc', rating: '4.5/5', review: 'Great collection and fair pricing' },
            { id: 4, name: 'Jimmy', rating: '3.0/5', review: 'Needs to improve delivery timelines' },
            { id: 5, name: 'Robert', rating: '4.8/5', review: 'Best vendor in the city!' },
            { id: 6, name: 'Kevin', rating: '2.0/5', review: 'Cancelled order at the last moment' },
        ],
        delivery: [
            { id: 1, name: 'Rahul', rating: '4.5/5', review: 'Very polite and arrived on time' },
            { id: 2, name: 'Sameer', rating: '3.0/5', review: 'Packaging was a bit torn' },
            { id: 3, name: 'Amit', rating: '5.0/5', review: 'Fastest delivery ever!' },
            { id: 4, name: 'Vikram', rating: '2.5/5', review: 'Refused to come to the 3rd floor' },
            { id: 5, name: 'Arjun', rating: '4.0/5', review: 'Handled fragile items with care' },
            { id: 6, name: 'Yash', rating: '3.5/5', review: 'Called too many times for location' },
        ]
    };

    const currentData = activeTab === 0 ? ratingsData.product : activeTab === 1 ? ratingsData.vendor : ratingsData.delivery;
    const secondColumnName = activeTab === 0 ? 'Product' : activeTab === 1 ? 'Vendor' : 'Delivery Partner';

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6, fontFamily: outfitFont }}>
            <Card sx={{ borderRadius: "15px", p: 6, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#000',
                        fontFamily: outfitFont
                    }}>Ratings Management</Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>
                        Export
                    </Button>
                </Box>

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, '& .MuiInputBase-input': { fontFamily: outfitFont } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />
                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ width: 160, borderRadius: '8px', fontFamily: outfitFont }}
                    >
                        <MenuItem value="all" sx={{ fontFamily: outfitFont }}>Select Status</MenuItem>
                        <MenuItem value="active" sx={{ fontFamily: outfitFont }}>Active</MenuItem>
                        <MenuItem value="inactive" sx={{ fontFamily: outfitFont }}>Inactive</MenuItem>
                        <MenuItem value="deleted" sx={{ fontFamily: outfitFont }}>Deleted</MenuItem>
                    </Select>
                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px' }}><i className="ri-arrow-up-down-line" x /></IconButton>
                    <Button sx={{ color: '#666', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>Reset</Button>
                </Box>

                {/* Tabs - No Ripple Effect */}
                <Tabs
                    value={activeTab}
                    onChange={(e, val) => setActiveTab(val)}
                    sx={{
                        mb: 3,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontFamily: outfitFont,
                            fontWeight: 500,
                            minWidth: 120,
                            color: '#8e98a8',
                            '&.Mui-focusVisible': { backgroundColor: 'transparent' },
                            '&:hover': { backgroundColor: 'transparent' },
                        },
                        '& .Mui-selected': {
                            color: '#1312127e !important',
                            backgroundColor: 'transparent !important',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#787a7ab0',
                            height: '3px',
                            borderRadius: '3px'
                        }
                    }}
                >
                    <Tab label="Product Ratings" disableRipple />
                    <Tab label="Vendor Rating" disableRipple />
                    <Tab label="Delivery Partner Rating" disableRipple />
                </Tabs>

                {/* Table */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', secondColumnName, 'Rating', 'Review', 'Action'].map((text) => (
                                    <TableCell
                                        key={text}
                                        // ID aur Product/Vendor ko LEFT, Review ko LEFT, Action ko CENTER
                                        align={text === 'Action' ? 'center' : 'left'}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#8e98a8',
                                            fontSize: '0.75rem',
                                            fontFamily: outfitFont,
                                            padding: "12px 16px",
                                        }}
                                    >
                                        {text.toUpperCase()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map((row) => (
                                <TableRow key={row.id} hover>

                                    <TableCell align="left" sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666' }}>
                                        {row.id}
                                    </TableCell>

                                    <TableCell align="left" sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', fontWeight: 500 }}>
                                        {row.name}
                                    </TableCell>

                                    <TableCell align="left" sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', fontWeight: 600 }}>
                                        {row.rating}
                                    </TableCell>

                                    <TableCell align="left" sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', maxWidth: '300px' }}>
                                        {row.review}
                                    </TableCell>

                                    <TableCell align="center" sx={{ padding: "12px 16px" }}>
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
                    <Button sx={{ textTransform: 'none', borderRadius: '8px', color: '#666', bgcolor: '#9ee8eb', height: 32, fontFamily: outfitFont }}>Previous</Button>

                    <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontFamily: outfitFont }}>1</Box>

                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', color: '#666', borderColor: '#ddd', height: 32, fontFamily: outfitFont }}>Next</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Rating_Management;