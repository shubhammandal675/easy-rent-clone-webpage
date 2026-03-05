'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Box, IconButton, TextField, MenuItem, Select, Button, Dialog, DialogContent
} from '@mui/material'

const SubCategory_List = ({ subCategories, setSubCategories, onAdd, onEdit, onView }) => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Delete State
    const [openDelete, setOpenDelete] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)

    const handleActiveToggle = (id) => {
        setSubCategories(prev => prev.map(item =>
            item.id === id ? { ...item, active: !item.active, status: !item.active ? 'Active' : 'Inactive' } : item
        ));
    };

    const handleReset = () => {
        setSearch('');
        setStatusFilter('all');
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        return subCategories.filter(item => {
            const matchesSearch = item.subCategory.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? item.active : !item.active;
            return matchesSearch && matchesStatus;
        });
    }, [search, subCategories, statusFilter]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const currentTableData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const confirmDelete = () => {
        setSubCategories(subCategories.filter(item => item.id !== idToDelete));
        setOpenDelete(false);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 } }}>
            <Card sx={{ borderRadius: "15px", p: 4, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'none' }}>

                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>Sub Category Management</Typography>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Import</Button>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Export</Button>
                        <Button variant="contained" onClick={onAdd} sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Add Sub Category</Button>
                    </Box>
                </Box>

                {/* Filters Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
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
                                {['ID', 'Image', 'Category', 'Sub Category', 'Status', 'Active / Inactive', 'Action'].map((text) => (
                                    <TableCell key={text} align="center" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', textTransform: 'uppercase' }}>{text}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentTableData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="center" sx={{ color: '#666', fontSize: '0.85rem' }}>{row.id}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ width: 45, height: 45, borderRadius: '30px', overflow: 'hidden', mx: 'auto', border: '1px solid #eee' }}>
                                            <Box component="img" src={row.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>{row.category}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>{row.subCategory}</TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ color: row.active ? '#4caf50' : '#f44336', fontWeight: 600, fontSize: '0.85rem' }}>
                                            {row.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleActiveToggle(row.id)} disableRipple sx={{ p: 0, backgroundColor: 'transparent !important' }}>
                                            <svg width="34" height="20" viewBox="0 0 24 14">
                                                <rect width="24" height="14" rx="7" fill={row.active ? '#00cfd5' : '#ccc'} fillOpacity={row.active ? "1" : "0.3"} />
                                                <circle cx={row.active ? 17 : 7} cy="7" r="5" fill="#fff" style={{ transition: 'all 0.2s ease' }} />
                                            </svg>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                            <IconButton onClick={() => onView(row)} size="small" sx={{ color: '#8e98a8' }}><i className="ri-eye-line" /></IconButton>
                                            <IconButton onClick={() => onEdit(row)} size="small" sx={{ color: '#8e98a8' }}><i className="ri-edit-box-line" /></IconButton>
                                            <IconButton onClick={() => { setIdToDelete(row.id); setOpenDelete(true); }} size="small" sx={{ color: '#8e98a8' }}><i className="ri-delete-bin-line" /></IconButton>
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

            </Card>

            {/* Delete Modal */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} PaperProps={{ sx: { borderRadius: '15px', p: 2, width: '380px', textAlign: 'center' } }}>
                <DialogContent>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Delete Sub Category</Typography>
                    <Typography sx={{ color: '#666', mb: 4 }}>Are you sure you want to delete this sub-category?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button onClick={confirmDelete} variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none' }}>Delete</Button>
                        <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
export default SubCategory_List;