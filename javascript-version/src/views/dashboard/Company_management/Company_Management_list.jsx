'use client'
import React, { useState, useMemo } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, MenuItem, Select, Button, InputAdornment, Chip, Dialog
} from '@mui/material'

const CompanyList = ({ companies, setCompanies, onAdd, onEdit, onView, onDelete }) => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState('all')
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const rowsPerPage = 10

    // --- Action Handlers ---
    const handleStatusUpdate = (id, newStatus) => {
        setCompanies(prev => prev.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    }

    const handleActiveToggle = (id) => {
        setCompanies(prev => prev.map(item =>
            item.id === id ? { ...item, active: !item.active } : item
        ))
    }

    const confirmDelete = () => {
        onDelete(deleteId); 
        setOpenDelete(false);
        setDeleteId(null);
    }

    // --- Filter Logic ---
    const filteredData = useMemo(() => {
        return companies.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.email.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true :
                statusFilter === 'active' ? c.active === true :
                statusFilter === 'inactive' ? c.active === false : true;
            return matchesSearch && matchesStatus;
        })
    }, [search, companies, statusFilter])

    const totalPages = Math.ceil(filteredData.length / rowsPerPage)
    const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 } }}>
            <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'none' }}>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 , color: '#000' }}>Company Management</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" sx={{ backgroundColor: '#00cfd5', gfdlyyyfduigiudsfhfdliudfsflifhshubhamtextTransform: 'none', borderRadius: '8px' }}>Import</Button>
                        <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', borderRadius: '8px' }}>Export</Button>
                        <Button onClick={onAdd} variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', borderRadius: '8px' }}>Add Company</Button>
                    </Box>
                </Box>

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 1.5, mb: 5, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />
                    <Select
                        size="small"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        sx={{ width: 150, borderRadius: '8px' }}
                    >
                        <MenuItem value="all">Select Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px' }}><i className="ri-equalizer-line" /></IconButton>
                    <Button onClick={() => {setSearch(''); setStatusFilter('all'); setCurrentPage(1);}} sx={{ color: 'rgb(46 38 61 / 90%)',  border: '1px solid #ddd', borderRadius: '8px' ,textTransform: 'none', fontWeight: 400 }}>Reset</Button>
                </Box>

                {/* Table */}
                <TableContainer sx={{ border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                            <TableRow>
                                {['ID', 'Image', 'Name', 'Email', 'Number', 'Status', 'Active / Inactive', 'Action'].map((head) => (
                                    <TableCell key={head} align="center" sx={{ fontWeight: 600, color: '#a0a0a0', fontSize: '0.75rem' }}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRows.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ width: 32, height: 32, backgroundColor: '#eef2ff', borderRadius: '50%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4' }}>
                                            <i className="ri-user-fill" />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.number}</TableCell>
                                    <TableCell align="center">
                                        {row.status === 'Buttons' ? (
                                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                                <Button onClick={() => handleStatusUpdate(row.id, 'Approved')} size="small" variant="contained" sx={{ backgroundColor: '#81c784', minWidth: '50px', fontSize: '0.65rem' }} >Approve</Button>
                                                <Button onClick={() => handleStatusUpdate(row.id, 'Rejected')} size="small" variant="contained" sx={{ backgroundColor: '#e57373', minWidth: '50px', fontSize: '0.65rem' }}>Reject</Button>
                                            </Box>
                                        ) : (
                                            <Chip label={row.status} size="small" sx={{ backgroundColor: row.status === 'Approved' ? '#81c784' : '#00cfd5', color: '#fff' }} />
                                        )}
                                    </TableCell>
                                    {/* --- YOUR EXACT TOGGLE START --- */}
                                    <TableCell align="center">
                                        <IconButton 
                                            onClick={() => handleActiveToggle(row.id)} 
                                            disableRipple 
                                            sx={{ 
                                                p: 0, 
                                                backgroundColor: 'transparent !important',
                                                '&:hover': { backgroundColor: 'transparent !important' },
                                                color: row.active ? '#00cfd5' : '#ccc' 
                                            }}
                                        >
                                            <svg width="34" height="20" viewBox="0 0 24 14" fill="none">
                                                <rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.active ? "1" : "0.2"} />
                                                <circle cx={row.active ? 17 : 7} cy="7" r="5" fill={row.active ? "#fff" : "currentColor"} style={{ transition: 'all 0.2s ease' }} />
                                            </svg>
                                        </IconButton>
                                    </TableCell>
                                    {/* --- YOUR EXACT TOGGLE END --- */}
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', color: '#888' }}>
                                            <IconButton onClick={() => onView(row)} size="small"><i className="ri-eye-line" /></IconButton>
                                            <IconButton onClick={() => onEdit(row)} size="small"><i className="ri-edit-box-line" /></IconButton>
                                            <IconButton onClick={() => { setDeleteId(row.id); setOpenDelete(true); }} size="small" ><i className="ri-delete-bin-line" /></IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 1 }}>
                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Previous</Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Box key={i} onClick={() => setCurrentPage(i + 1)} sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer', backgroundColor: currentPage === i + 1 ? '#333' : 'transparent', color: currentPage === i + 1 ? '#fff' : '#666', border: '1px solid #ddd' }}>{i + 1}</Box>
                    ))}
                    <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Next</Button>
                </Box>

                {/* Center Modal - Exact Screenshot Style */}
                <Dialog 
                    open={openDelete} 
                    onClose={() => setOpenDelete(false)}
                    PaperProps={{ sx: { borderRadius: '8px', p: 2, width: '350px', textAlign: 'center' } }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Delete Company</Typography>
                        <Typography sx={{ color: '#666', mb: 4 }}>Do you want to delete this company?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button onClick={confirmDelete} variant="contained" sx={{ backgroundColor: '#00cfd5', px: 4, borderRadius: '6px', textTransform: 'none' }}>Delete</Button>
                            <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', px: 4, borderRadius: '8px', textTransform: 'none' }}>Cancel</Button>
                        </Box>
                    </Box>
                </Dialog>
            </Card>
        </Box>
    )
}

export default CompanyList;