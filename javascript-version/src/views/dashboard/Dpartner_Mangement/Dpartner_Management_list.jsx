'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment, Dialog, DialogContent
} from '@mui/material'

const Dpartner_Management_list = ({ partners, setPartners, onAdd, onEdit, onView }) => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const rowsPerPage = 8

    const handleActiveToggle = (id) => {
        setPartners(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item))
    }

    // --- DELETE LOGIC (Directly updating the partners state) ---
    const confirmDelete = () => {
        setPartners(prev => prev.filter(item => item.id !== deleteId))
        setOpenDelete(false)
        setDeleteId(null)
    }

    // Filter Logic
    const filteredData = useMemo(() => {
        return partners.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.email.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : (statusFilter === 'active' ? p.active : !p.active);
            return matchesSearch && matchesStatus;
        });
    }, [search, partners, statusFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage)
    const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 } }}>
            <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'none' }}>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6  }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 , color: '#000'}}>Delivery Partner Management</Typography>
                    <Box sx={{ display: 'flex', gap: 1}}>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Import</Button>
                        <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Export</Button>
                        <Button onClick={onAdd} variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', boxShadow: 'none' }}>Add Delivery Partner</Button>
                    </Box>
                </Box>

                {/* Filter Bar */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
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

                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', '&:hover': { borderColor: '#ee9835' } }}>
                        <i className="ri-equalizer-line" />
                    </IconButton>

                    <Button onClick={() => { setSearch(''); setStatusFilter('all'); setCurrentPage(1); }} sx={{ color: 'rgb(46 38 61 / 90%)', border: '1px solid #ddd', borderRadius: '8px', textTransform: 'none', fontWeight: 400 }}>Reset</Button>

                </Box>

                {/* Table */}
                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'Image', 'Name', 'Email', 'Number', 'Status', 'Active / Inactive', 'Action'].map((text) => (
                                    <TableCell key={text} align="center" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', textTransform: 'uppercase' }}>{text}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRows.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ width: 32, height: 32, bgcolor: '#eef2ff', borderRadius: '50%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4' }}><i className="ri-user-fill" /></Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.number}</TableCell>
                                    <TableCell align="center">
                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: row.status === 'Approved' ? '#4caf50' : '#a0a0a0' }}>{row.status}</Typography>
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
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, color: '#a0a0a0' }}>
                                            <IconButton onClick={() => onView(row)} size="small"><i className="ri-eye-line" /></IconButton>
                                            <IconButton onClick={() => onEdit(row)} size="small"><i className="ri-edit-box-line" /></IconButton>
                                            <IconButton onClick={() => { setDeleteId(row.id); setOpenDelete(true); }} size="small"><i className="ri-delete-bin-line" /></IconButton>
                                        </Box>
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
                            textTransform: 'none',border:'1px solid #034d4f38',  borderRadius: '6px', bgcolor: '#b2ebf2', color: '#0b0c0cff', boxShadow: 'none',
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
                            textTransform: 'none',border:'1px solid #034d4f38', borderRadius: '6px', bgcolor: '#fff', color: '#070d0eff', boxShadow: 'none',
                            '&:hover': { bgcolor: '#80deea', boxShadow: 'none' },
                            '&.Mui-disabled': { bgcolor: '#e0f7fa', color: '#1d1d1dff' }
                        }}
                    >
                        Next
                    </Button>
                </Box>

                {/* Delete Modal - ConfirmDelete method used here */}
                <Dialog open={openDelete} onClose={() => setOpenDelete(false)} PaperProps={{ sx: { borderRadius: '15px', p: 2, width: '380px', textAlign: 'center' } }}>
                    <DialogContent>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Delete Partner</Typography>
                        <Typography sx={{ color: '#666', mb: 4 }}>Do you want to delete this delivery partner?</Typography>
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

export default Dpartner_Management_list