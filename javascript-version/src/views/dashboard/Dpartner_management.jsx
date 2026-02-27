'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment, Chip
} from '@mui/material'

const Dpartner_Management = () => {
  // 1. Aapka current data logic
  const [partners, setPartners] = useState([
    { id: 1, name: 'Zippy Logistics', email: 'contact@zippy.in', number: '+91 9876501234', status: 'Approved', active: true },
    { id: 2, name: 'Flash Delivery', email: 'support@flash.com', number: '+91 8822334455', status: 'Approved', active: true },
    { id: 3, name: 'Urban Express', email: 'admin@urbanex.io', number: '+91 7011223344', status: 'Pending', active: false },
    { id: 4, name: 'Swift Move', email: 'swift@delivery.net', number: '+91 9123456789', status: 'Approved', active: true },
    { id: 5, name: 'Blue Dart Plus', email: 'info@bluedart.in', number: '+91 9988776655', status: 'Pending', active: true },
    { id: 6, name: 'Courier Pro', email: 'hello@procourier.com', number: '+91 8447755663', status: 'Approved', active: false },
    { id: 7, name: 'Quick Ship', email: 'ops@quickship.com', number: '+91 9555443322', status: 'Pending', active: true },
    { id: 8, name: 'Metro Riders', email: 'metro@riders.co', number: '+91 7888999000', status: 'Approved', active: true },
    { id: 9, name: 'Falcon Cargo', email: 'falcon@cargo.com', number: '+91 6333221100', status: 'Pending', active: false },
    { id: 10, name: 'Green Mile', email: 'eco@greenmile.in', number: '+91 9000111222', status: 'Approved', active: true },

  ]);

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // Filter Logic (Search + Dropdown)
  const filteredData = useMemo(() => {
    return partners.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ? true :
          statusFilter === 'active' ? p.active === true :
            p.active === false;
      return matchesSearch && matchesStatus;
    });
  }, [search, partners, statusFilter]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1) }
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1) }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4, fontFamily: "'Outfit', sans-serif" ,p:5 }}>
      <Card sx={{ borderRadius: "15px", p:5, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

        {/* Top Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>Delivery Partner Management</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px' }}>Export</Button>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px' }}>Add Delivery Partner</Button>
          </Box>
        </Box>

        {/* Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 160, borderRadius: '8px' }}
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

          <Button onClick={() => { setSearch(''); setStatusFilter('all'); }} sx={{ color: '#00cfd5', fontWeight: 600, textTransform: 'none' }}>Reset</Button>
        </Box>

        {/* Management Table */}
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
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ width: 32, height: 32, bgcolor: '#eef2ff', borderRadius: '50%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4' }}><i className="ri-user-fill" /></Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell align="center" sx={{ color: '#666' }}>{row.email}</TableCell>
                  <TableCell align="center" sx={{ color: '#666' }}>{row.number}</TableCell>


                  {/* Status Column - ONLY Approved & Pending */}
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: row.status === 'Approved' ? '#4caf50' : '#a0a0a0'
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>


                  {/* Toggle Switch */}
                  <TableCell align="center" >
                    <IconButton
                      disableRipple
                      sx={{
                        p: 0, // Padding zero taaki extra space na le
                        backgroundColor: 'transparent !important',
                        '&:hover': {
                          backgroundColor: 'transparent !important', // Hover par bhi bg nahi aayega
                        },
                        '& .MuiTouchRipple-root': {
                          display: 'none', // Click karne par jo ripple aata hai use bhi band kar diya
                        }
                      }}
                    >
                      <svg width="34" height="20" viewBox="0 0 24 14">
                        {/* Track */}
                        <rect
                          width="24"
                          height="14"
                          rx="7"
                          fill={row.active ? '#00cfd5' : '#ccc'}
                          fillOpacity={row.active ? "1" : "0.3"}
                        />
                        {/* Circle */}
                        <circle
                          cx={row.active ? 17 : 7}
                          cy="7"
                          r="5"
                          fill="#fff"
                          style={{ transition: 'all 0.2s ease' }}
                        />
                      </svg>
                    </IconButton>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, color: '#a0a0a0' }}>
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

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={currentPage === 1}
            sx={{
              textTransform: 'none',
              borderRadius: '6px',
              color: '#666',
              borderColor: '#ddd',
              // Focus/Click fix
              '&:focus': {
                borderColor: '#3e878aff',
                outline: 'none'
              },
              '&:hover': {
                borderColor: '#00cfd5',
                backgroundColor: 'transparent'
              }
            }}
          >
            Previous
          </Button>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[...Array(totalPages)].map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                sx={{
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', cursor: 'pointer',
                  backgroundColor: currentPage === index + 1 ? '#333' : 'transparent',
                  color: currentPage === index + 1 ? '#fff' : '#666',
                  border: currentPage === index + 1 ? 'none' : '1px solid #ddd',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: currentPage === index + 1 ? 'none' : '#00cfd5'
                  }
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Box>

          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            sx={{
              textTransform: 'none',
              borderRadius: '6px',
              color: '#666',
              borderColor: '#ddd',
              // Focus/Click fix
              '&:focus': {
                borderColor: '#00cfd5',
                outline: 'none'
              },
              '&:hover': {
                borderColor: '#00cfd5',
                backgroundColor: 'transparent'
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default Dpartner_Management