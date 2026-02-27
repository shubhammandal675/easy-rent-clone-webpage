'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment, Chip
} from '@mui/material'

const Company_Management = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Ram kast', email: 'ram@grr.la', number: '+91 916754356435', status: 'ReApprove', active: true },
    { id: 2, name: 'Naman Sharma', email: 'naman.s@mailinator.com', number: '+91 3636363636', status: 'Buttons', active: true },
    { id: 3, name: 'Ohyod Kxhhd', email: 'ohyod.dev@testmail.com', number: '+91 2134994846', status: 'Buttons', active: false },
    { id: 4, name: 'Urban Rentals', email: 'contact@urbanrent.in', number: '+91 9876543210', status: 'Pending', active: true },
    { id: 5, name: 'Skyline Corp', email: 'info@skyline.com', number: '+91 6496494649', status: 'Pending', active: true },
    { id: 6, name: ' Gupta', email: 'gupta.h@mailinator.com', number: '+91 5946494346', status: 'ReApprove', active: false },
    { id: 7, name: 'Blue Wave Tech', email: 'support@bluewave.io', number: '+91 1234567896', status: 'Pending', active: true },
    { id: 8, name: 'Apex Logistics', email: 'admin@apexlog.com', number: '+91 11234567890', status: 'Buttons', active: true },
    { id: 9, name: 'Global Solutions', email: 'global@bizmail.com', number: '+91 3565959659', status: 'Pending', active: false },
    { id: 10, name: 'NexGen Media', email: 'hello@nexgen.com', number: '+91 9111111222', status: 'Pending', active: true },
    { id: 11, name: 'Priya Enterprises', email: 'priya.ent@yahoo.com', number: '+91 9988776655', status: 'ReApprove', active: true },
    { id: 12, name: 'Viking Traders', email: 'viking@trade.net', number: '+91 8877665544', status: 'Buttons', active: false },
    { id: 13, name: 'Swift Delivery', email: 'swift@delivery.com', number: '+91 7766554433', status: 'Pending', active: true }
  ]);

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 10

  // Handle toggle logic for Active/Inactive
  const handleActiveToggle = (id) => {
    setCompanies(prev => prev.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ))
  }

  const filteredData = useMemo(() => {
    return companies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, companies])

  // Pagination 
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1) }
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1) }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, sm: 4 }, fontFamily: "'Outfit', sans-serif" }}>
      <Card sx={{ borderRadius: "15px", boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', p: 5, backgroundColor: '#fff' }}>

        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, mt: 5 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#000000' }}>Company Management</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', borderRadius: '6px' }}>Export</Button>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', borderRadius: '6px' }}>Add Company</Button>
          </Box>
        </Box>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            sx={{
              width: 280,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ee9835ff', // Focus par orange border
                  borderWidth: '1px'
                }
              }
            }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
          />

          <Select
            size="small"
            value={statusFilter} // 'all', 'active', ya 'inactive' state
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            displayEmpty
            sx={{
              color: '#000000',
              width: 150,
              borderRadius: '8px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ee9835ff',
                borderWidth: '1px'
              }
            }}
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

          <Button
            onClick={() => {
              setSearch('');
              setStatusFilter('all'); // Reset dropdown too
              setCurrentPage(1);
            }}
            sx={{
              color: '#00cfd5',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { backgroundColor: 'transparent', color: '#00b8bc' }
            }}
          >
            Reset
          </Button>
        </Box>

        {/* Table Section */}
        <TableContainer sx={{ border: '1px solid #f0f0f0', borderRadius: '12px' }}>
          <Table>
            <TableHead>
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
                    <Box sx={{ width: 32, height: 32, backgroundColor: '#eef2ff', borderRadius: '50%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4' }}><i className="ri-user-fill" /></Box>
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.number}</TableCell>

                  {/* Status Column (Text/Buttons) */}
                  <TableCell align="center">
                    {row.status === 'ReApprove' && <Chip label="ReApprove" size="small" sx={{ backgroundColor: '#00cfd5', color: '#fff', fontSize: '0.7rem' }} />}
                    {row.status === 'Pending' && <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>Pending</Typography>}
                    {row.status === 'Buttons' && (
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Button size="small" variant="contained" sx={{ backgroundColor: '#81c784', minWidth: '50px', fontSize: '0.65rem', textTransform: 'none' }}>Approve</Button>
                        <Button size="small" variant="contained" sx={{ backgroundColor: '#e57373', minWidth: '50px', fontSize: '0.65rem', textTransform: 'none' }}>Reject</Button>
                      </Box>
                    )}
                  </TableCell>


                  {/* Active / Inactive Column (Toggle) */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleActiveToggle(row.id)}
                      disableRipple
                      sx={{
                        p: 0,
                        color: row.active ? '#00cfd5' : '#ccc',
                        backgroundColor: 'transparent !important', 
                        
                        '&:hover': {
                          backgroundColor: 'transparent !important', 
                        }
                      }}
                    >

                      <svg width="34" height="20" viewBox="0 0 24 14" fill="none">
                        <rect
                          width="24"
                          height="14"
                          rx="7"
                          fill="currentColor"
                          fillOpacity={row.active ? "1" : "0.2"}
                        />
                        <circle
                          cx={row.active ? 17 : 7}
                          cy="7"
                          r="5"
                          fill={row.active ? "#fff" : "currentColor"}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                      </svg>
                    </IconButton>
                  </TableCell>

                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', color: '#888' }}>
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

export default Company_Management