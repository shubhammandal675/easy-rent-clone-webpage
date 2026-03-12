'use client'
import React, { useState, useMemo } from 'react'
import axios from "axios"
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton, TextField, MenuItem, Select, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material'



// FIX 1: Added onStatusToggle to the props destructuring
const CustomerList = ({ customers, onAction, onDelete, onStatusToggle }) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const rowsPerPage = 10

  const filteredData = useMemo(() => {
    return customers.filter(c => {
      const name = c.name ? c.name.toLowerCase() : '';
      const email = c.email ? c.email.toLowerCase() : '';
      const matchesSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());

      // FIX 2: Corrected status filtering logic to match boolean status
      const matchesStatus = statusFilter === 'all'
        ? true
        : (statusFilter === 'active' ? c.status === true : c.status === false);

      return matchesSearch && matchesStatus;
    })
  }, [search, statusFilter, customers])

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 5 }}>
      <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff' }}>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#000' }}>Customer Management</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Import</Button>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Export</Button>
            <Button variant="contained" onClick={() => onAction('add')} sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Add Customer</Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search by name or email" value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
            sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Select size="small" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} sx={{ width: 150, borderRadius: '8px' }}>
            <MenuItem value="all">Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}><i className="ri-equalizer-line" /></IconButton>
          <Button onClick={() => { setSearch(''); setStatusFilter('all'); setCurrentPage(1); }} sx={{ color: 'rgb(46 38 61 / 90%)', border: '1px solid #ddd', borderRadius: '8px', textTransform: 'none', fontWeight: 400 }}>Reset</Button>
        </Box>

        {/* Table */}
        <TableContainer sx={{ border: '1px solid #f0f0f0', borderRadius: '12px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fafafa' }}>
              <TableRow>
                {['ID', 'Image', 'Name', 'Email', 'Number', 'Status', 'Action'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, color: '#a0a0a0', fontSize: '0.75rem' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, index) => (
                <TableRow key={row._id} hover>
                  <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={row.profileImage ? `http://localhost:5000${row.profileImage}` : ''}
                      sx={{ width: 34, height: 34 }}
                    >
                      <i className="ri-user-fill" />
                    </Avatar>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>

                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {row.countryCode && row.number
                      ? `${row.countryCode} ${row.number}`
                      : row.contact || "-"
                    }
                  </TableCell>

                  {/* FIX 3: Linked the Toggle work to the IconButton click */}
                  <TableCell>
                    <IconButton
                      onClick={() => onStatusToggle(row._id, row.status)}
                      sx={{
                        p: 0,
                        color: row.status ? '#00cfd5' : '#ccc',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      <svg width="34" height="20" viewBox="0 0 24 14" fill="none">
                        <rect
                          width="24"
                          height="14"
                          rx="7"
                          fill="currentColor"
                          fillOpacity={row.status ? "1" : "0.3"}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        <circle
                          cx={row.status ? 17 : 7}
                          cy="7"
                          r="5"
                          fill={row.status ? "#fff" : "currentColor"}
                          style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                      </svg>
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, color: '#888' }}>
                      <IconButton size="small" onClick={() => onAction('view', row)}><i className="ri-eye-line" /></IconButton>
                      <IconButton size="small" onClick={() => onAction('edit', row)}><i className="ri-edit-box-line" /></IconButton>
                      <IconButton size="small" onClick={() => { setDeleteId(row._id); setOpenDelete(true); }}><i className="ri-delete-bin-line" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination UI */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Previous</Button>
          {[...Array(totalPages)].map((_, i) => (
            <Box key={i} onClick={() => setCurrentPage(i + 1)} sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer', backgroundColor: currentPage === i + 1 ? '#333' : 'transparent', color: currentPage === i + 1 ? '#fff' : '#666', border: '1px solid #ddd' }}>{i + 1}</Box>
          ))}
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Next</Button>
        </Box>

        {/* Delete Dialog */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)} PaperProps={{ sx: { borderRadius: '15px' } }}>
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>Delete Customer</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>Do you want to delete this customer?</DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
            <Button onClick={() => { onDelete(deleteId); setOpenDelete(false); }} variant="contained" sx={{ backgroundColor: '#00cfd5' }}>Delete</Button>
            <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5' }}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  )
}

export default CustomerList