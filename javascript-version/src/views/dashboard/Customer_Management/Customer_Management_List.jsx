'use client'
import React, { useState, useMemo } from 'react'
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton, TextField, MenuItem, Select, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

const Customer_Management_List = ({ customers, setCustomers, onAction, onDelete }) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const rowsPerPage = 10

  // Filter Logic 
  const filteredData = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                            c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : 
                            (statusFilter === 'active' ? c.status === true : c.status === false);
      return matchesSearch && matchesStatus;
    })
  }, [search, statusFilter, customers])


  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleStatusChange = (id) => {
    setCustomers(prev => prev.map(item => item.id === id ? { ...item, status: !item.status } : item))
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 5 }}>
      <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff' }}>
        
        {/* Header - IMPORT BUTTON RESTORED */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 , color: '#000' }}>Customer Management</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Import</Button>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Export</Button>
            <Button variant="contained" onClick={() => onAction('add')} sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Add Customer</Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search..." value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} 
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
            sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Select size="small" value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}} sx={{ width: 150, borderRadius: '8px' }}>
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
                {['ID', 'Image', 'Name', 'Email', 'Number', 'Status', 'Action'].map((head) => (
                  <TableCell key={head} sx={{ fontWeight: 600, color: '#a0a0a0', fontSize: '0.75rem' }}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell><Box sx={{ width: 32, height: 32, backgroundColor: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4' }}><i className="ri-user-fill" /></Box></TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleStatusChange(row.id)} sx={{ p: 0, color: row.status ? '#00cfd5' : '#ccc' }}>
                      <svg width="34" height="20" viewBox="0 0 24 14"><rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.status ? "1" : "0.3"} /><circle cx={row.status ? 17 : 7} cy="7" r="5" fill={row.status ? "#fff" : "currentColor"} /></svg>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => onAction('view', row)}><i className="ri-eye-line" /></IconButton>
                      <IconButton size="small" onClick={() => onAction('edit', row)}><i className="ri-edit-box-line" /></IconButton>
                      <IconButton size="small" onClick={() => {setDeleteId(row.id); setOpenDelete(true)}}><i className="ri-delete-bin-line" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION RESTORED */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Previous</Button>
          {[...Array(totalPages)].map((_, i) => (
            <Box key={i} onClick={() => setCurrentPage(i + 1)} sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer', backgroundColor: currentPage === i + 1 ? '#333' : 'transparent', color: currentPage === i + 1 ? '#fff' : '#666', border: '1px solid #ddd' }}>{i + 1}</Box>
          ))}
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Next</Button>
        </Box>

        {/* Delete Modal */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle sx={{ fontWeight: 700 }}>Delete Customer</DialogTitle>
          <DialogContent>Do you want to delete this customer?</DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={() => { onDelete(deleteId); setOpenDelete(false); }} variant="contained" sx={{ backgroundColor: '#00cfd5' }}>Delete</Button>
            <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5' }}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  )
}
export default Customer_Management_List