'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const Order_List = ({ orders, onView }) => {
    const outfitFont = "'Outfit', sans-serif";
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [deliveryFilter, setDeliveryFilter] = useState('all')

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Exact Status List from your screenshot
    const statusOptions = [
        "Pending Payment", "Confirmed", "Ready for Delivery",
        "Out of Delivery", "Delivered", "Ongoing",
        "Return Requested", "Returned", "Completed", "Cancelled"
    ];

    // Exact Delivery Types from your screenshot
    const deliveryOptions = ["Self pickup", "Company delivery", "Event hero delivery"];

    // Filter Logic
    const filteredData = useMemo(() => {
        return orders.filter(item => {
            const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase()) ||
                item.id.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;
            const matchesDelivery = deliveryFilter === 'all' ? true : item.deliveryType === deliveryFilter;
            return matchesSearch && matchesStatus && matchesDelivery;
        });
    }, [search, orders, statusFilter, deliveryFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTableData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleReset = () => {
        setSearch('');
        setStatusFilter('all');
        setDeliveryFilter('all');
        setCurrentPage(1);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4 }}>
            <Card sx={{ borderRadius: "15px", p: 4, boxShadow: 'none', border: '1px solid #eef0f2' }}>

                {/* Header - Create Order Button Removed */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: outfitFont }}>Order Management</Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>Export</Button>
                </Box>

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                        size="small" placeholder="Search by product"
                        value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />

                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 180, borderRadius: '8px', fontFamily: outfitFont }}
                    >
                        <MenuItem value="all">Select Status</MenuItem>
                        {statusOptions.map(status => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </Select>

                    <Select
                        size="small"
                        value={deliveryFilter}
                        onChange={(e) => { setDeliveryFilter(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 200, borderRadius: '8px', fontFamily: outfitFont }}
                    >
                        <MenuItem value="all">Select Delivery Type</MenuItem>
                        {deliveryOptions.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>

                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '7px' }}>
                        <i className="ri-arrow-up-down-line" />
                    </IconButton>

                    <Button onClick={handleReset} sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>Reset</Button>
                </Box>

                {/* Table */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Product', 'Quantity', 'Price', 'Delivery Type', 'Status', 'Action'].map((text) => (
                                    <TableCell key={text} align="left" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', fontFamily: outfitFont }}>{text.toUpperCase()}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTableData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ color: '#666', fontSize: '0.85rem', fontFamily: outfitFont }}>{row.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500, fontSize: '0.85rem', fontFamily: outfitFont }}>{row.product}</TableCell>
                                    <TableCell sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.quantity}</TableCell>
                                    <TableCell sx={{ fontSize: '0.85rem', fontFamily: outfitFont, fontWeight: 600 }}>{row.price}</TableCell>
                                    <TableCell sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.deliveryType}</TableCell>
                                    <TableCell sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>{row.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onView(row)} size="small" sx={{ color: '#8e98a8' }}><i className="ri-eye-line" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Section - Image Style Fix */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        variant="contained"
                        sx={{
                            textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', bgcolor: '#b2ebf2', color: '#0b0c0cff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea', boxShadow: 'none' },
                            '&.Mui-disabled': { bgcolor: '#83d8d9', color: '#fff' }
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
                                }}
                            >
                                {i + 1}
                            </Box>
                        ))}
                    </Box>

                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        variant="contained"
                        sx={{
                            textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', bgcolor: '#fff', color: '#070d0eff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea', boxShadow: 'none' },
                            '&.Mui-disabled': { bgcolor: '#e0f7fa', color: '#1d1d1dff' }
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Order_List