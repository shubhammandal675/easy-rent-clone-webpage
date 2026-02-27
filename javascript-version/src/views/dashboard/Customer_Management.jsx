'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const Customer_Management = () => {
  // --- FIX 1: setCustomers state add kiya ---
  const [customers, setCustomers] = useState([
    { id: 1, name: 'test test', email: 'testuser5@mailinator.com', number: '+91 2464649916', status: true },
    { id: 2, name: 'Aman Kaur', email: 'aman@mailinator.com', number: '+91 9863214745', status: true },
    { id: 3, name: 'testingdev singh', email: 'promatics.davinder02@gmail.com', number: '+91 9143343434', status: true },
    { id: 4, name: 'customer first', email: 'promatics.aman13@gmail.com', number: '+91 9193456754', status: false },
    { id: 5, name: 'New Test Customer', email: 'customer1@gmail.com', number: '+91 9193876451', status: true },
    { id: 6, name: 'Retest Customer', email: 'testcustomer@gmail.com', number: '+91 9196347245', status: true },
    { id: 7, name: 'Rajan Prajapati', email: 'rajan@gmail.com', number: '+91 8787653334', status: true },
    { id: 8, name: 'Yash Kapoor', email: 'yash@gmail.com', number: '+91 9879879876', status: true },
    { id: 9, name: 'Arman Jaleel', email: 'arman@mailinator.com', number: '+91 9997865432', status: true },
    { id: 10, name: 'Yash Kapoor', email: 'yash2@mailinator.com', number: '+91 9998887776', status: true },
    { id: 11, name: 'Siddharth Malhotra', email: 'sid@gmail.com', number: '+91 9988776655', status: true },
    { id: 12, name: 'Priya Sharma', email: 'priya@mail.com', number: '+91 9876543210', status: true },
    { id: 13, name: 'Rahul Verma', email: 'rahul@verma.com', number: '+91 9123456789', status: true },
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // Filter state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // --- FIX 2: Memoized Search + Status Filter ---
  const filteredData = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true :
        (statusFilter === 'active' ? c.status === true : c.status === false);
      return matchesSearch && matchesStatus;
    })
  }, [search, statusFilter, customers])

  // --- FIX 3: Working Toggle Function ---
  const handleStatusChange = (id) => {
    setCustomers(prev => prev.map(item =>
      item.id === id ? { ...item, status: !item.status } : item
    ))
  }

  // Pagination Calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleReset = () => {
    setSearch('')
    setStatusFilter('all')
    setCurrentPage(1)
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 } ,p:5 }}>
      <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff' }}>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 , color: '#000' }}>Customer Management</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Export</Button>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Add Customer</Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
            sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
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

          <IconButton sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            '&:focus': { outline: 'none' },
            '&:hover': { borderColor: '#ee9835ff' }
          }}>
            <i className="ri-equalizer-line" />
          </IconButton>

          <Button onClick={handleReset} sx={{ color: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>
            Reset
          </Button>
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
                  <TableCell>
                    <Box sx={{ width: 32, height: 32, backgroundColor: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4ff' }}>
                      <i className="ri-user-fill" />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.number}</TableCell>

                  <TableCell align="left">
                    <IconButton
                      onClick={() => handleStatusChange(row.id)}
                      disableRipple
                      sx={{ p: 0, color: row.status ? '#00cfd5' : '#ccc', backgroundColor: 'transparent !important' }}
                    >
                      <svg width="34" height="20" viewBox="0 0 24 14" fill="none">
                        <rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.status ? "1" : "0.3"} />
                        <circle cx={row.status ? 17 : 7} cy="7" r="5" fill={row.status ? "#fff" : "currentColor"} style={{ transition: 'all 0.2s ease' }} />
                      </svg>
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, color: '#888' }}>
                      <IconButton size="small"><i className="ri-eye-line" /></IconButton>
                      <IconButton size="small"><i className="ri-edit-box-line" /></IconButton>
                      <IconButton size="small"><i className="ri-delete-bin-line" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination UI */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}
          >Previous</Button>

          {[...Array(totalPages)].map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              sx={{
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer',
                backgroundColor: currentPage === i + 1 ? '#333' : 'transparent',
                color: currentPage === i + 1 ? '#fff' : '#666',
                border: '1px solid #ddd'
              }}
            >
              {i + 1}
            </Box>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}
          >Next</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default Customer_Management