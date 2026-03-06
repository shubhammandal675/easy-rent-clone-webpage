'use client'
import React, { useState, useMemo } from 'react'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Box, IconButton, TextField, Button, InputAdornment,
    MenuItem, Select, Tabs, Tab, Dialog, DialogActions, DialogContent
} from '@mui/material'

const NotificationList = ({ notifications, setNotifications, onAddClick, outfitFont }) => {
    // --- States ---
    const [tabValue, setTabValue] = useState(0); 
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Select Status');
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Ek page par kitne rows dikhane hain

    // --- Search & Status Filter Logic ---
    const filteredData = useMemo(() => {
        return notifications.filter((item) => {
            const matchesSearch = 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sent_to.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = 
                statusFilter === 'Select Status' || item.status === statusFilter;

            return matchesSearch && matchesStatus; // Tab filter hata diya hai
        });
    }, [notifications, searchTerm, statusFilter]);

    // --- Pagination Logic ---
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- Action Functions ---
    const handleReset = () => {
        setSearchTerm('');
        setStatusFilter('Select Status');
        setCurrentPage(1);
    };

    const confirmDelete = () => {
        setNotifications(notifications.filter(item => item.id !== deleteId));
        setOpenDelete(false);
        setDeleteId(null);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: outfitFont }}>
                    Notification Management
                </Typography>
                <Button
                    variant="contained"
                    onClick={onAddClick}
                    sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont, fontWeight: 600 }}
                >
                    Add Notification
                </Button>
            </Box>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                <TextField
                    size="small"
                    placeholder="Search by title or email"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                />

                <Select 
                    size="small" 
                    value={statusFilter} 
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    sx={{ width: 180, borderRadius: '8px' }}
                >
                    <MenuItem value="Select Status" disabled>Select Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>

                 <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', '&:hover': { borderColor: '#ee9835ff' } }}>
                             <i className="ri-equalizer-line" />
                           </IconButton>
                
                <Button onClick={handleReset} sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>
                    Reset
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} TabIndicatorProps={{ style: { backgroundColor: '#787e7e5d', height: '3px' } }}>
                    <Tab label="Sent" sx={{ textTransform: 'none', fontFamily: outfitFont, fontWeight: 600 }} />
                    <Tab label="Received" sx={{ textTransform: 'none', fontFamily: outfitFont, fontWeight: 600 }} />
                </Tabs>
            </Box>

            {/* Table */}
            <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                <Table size="small">
                    <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                        <TableRow>
                            {['ID', 'Title', 'Description', 'Sent To', 'Type', 'Date/Time', 'Status', 'Action'].map((head) => (
                                <TableCell key={head} sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', fontFamily: outfitFont, p: 2 }}>{head.toUpperCase()}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.id}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.title}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.description}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.sent_to}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.type}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem' }}>{row.date_time}</TableCell>
                                <TableCell sx={{ p: 2, fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.status}</TableCell>
                                <TableCell sx={{ p: 2 }}>
                                    <IconButton size="small" onClick={() => { setDeleteId(row.id); setOpenDelete(true); }}><i className="ri-delete-bin-line" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    variant="contained"
                    sx={{
                        textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', 
                        bgcolor: '#b2ebf2', color: '#0b0c0cff', boxShadow: 'none',
                        fontFamily: outfitFont,
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
                                width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                borderRadius: '6px', cursor: 'pointer', fontFamily: outfitFont,
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
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(p => p + 1)}
                    variant="contained"
                    sx={{
                        textTransform: 'none', border: '1px solid #034d4f38', borderRadius: '6px', 
                        bgcolor: '#fff', color: '#070d0eff', boxShadow: 'none',
                        fontFamily: outfitFont,
                        '&:hover': { bgcolor: '#f0f0f0', boxShadow: 'none', border: '1px solid #034d4f' },
                        '&.Mui-disabled': { bgcolor: '#e0f7fa', color: '#1d1d1dff' }
                    }}
                >
                    Next
                </Button>
            </Box>

            {/* Delete Modal */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogContent sx={{ textAlign: 'center', pt: 3, fontFamily: outfitFont }}>Do you want to delete this Notification?</DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
                    <Button onClick={confirmDelete} variant="contained" sx={{ backgroundColor: '#00cfd5', px: 4 }}>Delete</Button>
                    <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', px: 4 }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NotificationList;