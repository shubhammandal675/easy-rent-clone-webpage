'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const Delivery_List = ({ orders, onView }) => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

    // States for Search, Filter and Pagination
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Aap ise change kar sakte hain

    // Filtering Logic
    const filteredData = useMemo(() => {
        return orders.filter(item => {
            const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase()) ||
                item.id.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [search, orders, statusFilter]);

    // Pagination Calculations
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentTableData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6 }}>
            <Card sx={{ borderRadius: "15px", p: 6, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: outfitFont }}>Delivery Management</Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>Export</Button>
                </Box>

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                        size="small" placeholder="Search by name or email"
                        value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />
                    <Select size="small" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} displayEmpty sx={{ width: 160, borderRadius: '8px', fontFamily: outfitFont }}>
                        <MenuItem value="all">Select Status</MenuItem>
                        <MenuItem value="Placed">Placed</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>

                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '7px' }}>
                        <i className="ri-arrow-up-down-line" />
                    </IconButton>

                    <Button onClick={() => { setSearch(''); setStatusFilter('all'); setCurrentPage(1); }} sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>Reset</Button>
                </Box>


                {/* Table */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Product', 'Quantity', 'Price', 'Delivery Partner', 'Estimated Date', 'Status', 'Action'].map((text) => (
                                    <TableCell key={text} align={text === 'ID' || text === 'Product' || text === 'Delivery Partner' || text === 'Estimated Date' || text === 'Action' ? 'left' : 'center'} sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', fontFamily: outfitFont }}>{text}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTableData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="left" sx={{ fontSize: '0.85rem', fontFamily: outfitFont, color: '#666' }}>{row.id}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: '0.85rem', fontFamily: outfitFont, fontWeight: 500 }}>{row.product}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.quantity}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.price}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.deliveryPartner}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.estimatedDate}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.status}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => onView(row)} size="small" sx={{ color: '#8e98a8' }}><i className="ri-eye-line" /></IconButton>
                                        <Typography component="span" sx={{ fontSize: '0.85rem', fontFamily: outfitFont, ml: 1 }}>{row.action}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Section - Your Exact Style Integrated */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        variant="contained"
                        sx={{
                            textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', bgcolor: '#b2ebf2', color: '#0b0c0cff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea', boxShadow: 'none' },
                            '&.Mui-disabled': { bgcolor: '#83d8d9', color: '#fff' },
                            fontFamily: outfitFont
                        }}
                    >
                        Previous
                    </Button>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {[...Array(totalPages)].map((_, i) => (
                            <Box
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                sx={{
                                    width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer',
                                    backgroundColor: currentPage === i + 1 ? '#034d4f' : '#fff',
                                    color: currentPage === i + 1 ? '#fff' : '#666',
                                    border: currentPage === i + 1 ? 'none' : '1px solid #034d4f',
                                    fontSize: '0.9rem', fontWeight: currentPage === i + 1 ? 600 : 400,
                                    fontFamily: outfitFont
                                }}
                            >
                                {i + 1}
                            </Box>
                        ))}
                    </Box>

                    <Button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                        variant="contained"
                        sx={{
                            textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', bgcolor: '#fff', color: '#070d0eff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea', boxShadow: 'none' },
                            '&.Mui-disabled': { bgcolor: '#e0f7fa', color: '#1d1d1dff' },
                            fontFamily: outfitFont
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Delivery_List