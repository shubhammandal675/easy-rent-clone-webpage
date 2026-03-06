'use client'
import React, { useState } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment, Tabs, Tab
} from '@mui/material'

const Rating_List = ({ ratingsData, onView }) => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
    const [activeTab, setActiveTab] = useState(0);
    const [statusFilter, setStatusFilter] = useState('all');

    // Category mapping for tabs
    const categories = ['product', 'vendor', 'delivery'];
    const currentData = ratingsData[categories[activeTab]];
    const secondColumnName = activeTab === 0 ? 'Product' : activeTab === 1 ? 'Vendor' : 'Delivery Partner';

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6, fontFamily: outfitFont }}>
            <Card sx={{ borderRadius: "15px", p: 6, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>

                {/* Header - RESTORED */}
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

                {/* Filters - RESTORED */}
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
                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px' }}><i className="ri-arrow-up-down-line" /></IconButton>
                    <Button sx={{ color: '#666', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>Reset</Button>
                </Box>

                {/* Tabs - RESTORED */}
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
                                    <TableCell sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', fontWeight: 500 }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', fontWeight: 600 }}>
                                        {row.rating}
                                    </TableCell>
                                    <TableCell sx={{ padding: "12px 16px", fontSize: '0.85rem', fontFamily: outfitFont, color: '#666', maxWidth: '300px' }}>
                                        {row.review}
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: "12px 16px" }}>
                                        <IconButton onClick={() => onView(row, currentData)} size="small" sx={{ color: '#8e98a8' }}>
                                            <i className="ri-eye-line" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination - RESTORED */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                    <Button sx={{ textTransform: 'none', borderRadius: '8px', color: '#666', bgcolor: '#9ee8eb', height: 32, fontFamily: outfitFont }}>Previous</Button>
                    <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontFamily: outfitFont }}>1</Box>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', color: '#666', borderColor: '#ddd', height: 32, fontFamily: outfitFont }}>Next</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Rating_List;