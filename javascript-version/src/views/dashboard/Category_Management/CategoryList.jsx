'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Box, IconButton, TextField, MenuItem, Select, Button,
    InputAdornment, Avatar, Dialog, DialogContent
} from '@mui/material'

const CategoryList = ({ categories, setCategories, onAdd, onEdit, onView }) => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // --- DELETE MODAL STATES ---
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const handleActiveToggle = (id) => {
        setCategories(prev => prev.map(item =>
            item.id === id ? { ...item, active: !item.active, status: !item.active ? 'Active' : 'Inactive' } : item
        ));
    };

    // --- DELETE LOGIC ---
    const handleDeleteOpen = (id) => {
        setDeleteTargetId(id);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setCategories(categories.filter(c => c.id !== deleteTargetId));
        setOpenDelete(false);
        setDeleteTargetId(null);
        // Agar current page khali ho jaye delete ke baad
        if (currentTableData.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const filteredData = useMemo(() => {
        return categories.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? item.active : !item.active;
            return matchesSearch && matchesStatus;
        });
    }, [search, categories, statusFilter]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const currentTableData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 } }}>
            <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'none' }}>

                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>Category Management</Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', borderRadius: '8px', textTransform: 'none' }}>Import</Button>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', borderRadius: '8px', textTransform: 'none' }}>Export</Button>
                        <Button variant="contained" onClick={onAdd} sx={{ bgcolor: '#00cfd5', borderRadius: '8px', textTransform: 'none' }}>Add Category</Button>
                    </Box>
                </Box>

                {/* Filter Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />
                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 160, borderRadius: '8px' }}
                    >
                        <MenuItem value="all">Select Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                    <Button onClick={() => { setSearch(''); setStatusFilter('all'); setCurrentPage(1); }} sx={{ border: '1px solid #ddd', color: '#000', textTransform: 'none', borderRadius: '8px', px: 3 }}>Reset</Button>
                </Box>

                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Image', 'Name', 'Status', 'Product Comm.', 'Delivery Comm.', 'Active / Inactive', 'Action'].map((text) => (
                                    <TableCell key={text} sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem' }}>{text}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTableData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell align="start" sx={{ pl: 4 }}>
                                        <Box sx={{ width: 45, height: 45, borderRadius: '22px', overflow: 'hidden', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box component="img" src={row.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell sx={{ color: row.active ? '#4caf50' : '#f44336', fontWeight: 600 }}>{row.status}</TableCell>
                                    <TableCell align="center">{row.productComm}%</TableCell>
                                    <TableCell align="center">{row.deliveryComm}%</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleActiveToggle(row.id)} disableRipple sx={{ p: 0, backgroundColor: 'transparent !important' }}>
                                            <svg width="34" height="20" viewBox="0 0 24 14">
                                                <rect width="24" height="14" rx="7" fill={row.active ? '#00cfd5' : '#ccc'} fillOpacity={row.active ? "1" : "0.3"} />
                                                <circle cx={row.active ? 17 : 7} cy="7" r="5" fill="#fff" style={{ transition: 'all 0.2s ease' }} />
                                            </svg>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <IconButton onClick={() => onView(row)} size="small"><i className="ri-eye-line" /></IconButton>
                                            <IconButton onClick={() => onEdit(row)} size="small"><i className="ri-edit-box-line" /></IconButton>
                                            {/* DELETE TRIGGER */}
                                            <IconButton size="small" onClick={() => handleDeleteOpen(row.id)}>
                                                <i className="ri-delete-bin-line" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                {/* --- PAGINATION (Back Again!) --- */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        variant="contained"
                        sx={{
                            textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', bgcolor: '#b2ebf2', color: '#0b0c0cff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea' },
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
                            '&:hover': { bgcolor: '#80deea' },
                            '&.Mui-disabled': { bgcolor: '#e0f7fa', color: '#1d1d1dff' }
                        }}
                    >
                        Next
                    </Button>
                </Box>

                {/* --- DELETE MODAL --- */}
                <Dialog
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    PaperProps={{ sx: { borderRadius: '15px', p: 2, width: '380px', textAlign: 'center' } }}
                    sx={{ '& .MuiBackdrop-root': { backdropFilter: 'blur(3px)' } }}
                >
                    <DialogContent>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Delete Category</Typography>
                        <Typography sx={{ color: '#666', mb: 4 }}>Do you want to delete this category?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button onClick={confirmDelete} variant="contained" sx={{ backgroundColor: '#00cfd5', px: 4, borderRadius: '8px', textTransform: 'none', boxShadow: 'none' }}>Delete</Button>
                            <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', px: 4, borderRadius: '8px', textTransform: 'none' }}>Cancel</Button>
                        </Box>
                    </DialogContent>
                </Dialog>

            </Card>
        </Box>
    )
}
export default CategoryList;