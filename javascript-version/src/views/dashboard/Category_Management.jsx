'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const Category_Management = () => {
  const [categories, setCategories] = useState([
    {
      id: 'CAT-005',
      name: 'Bakeware',
      status: 'Active',
      active: true,
      image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'CAT-004',
      name: 'Cutlery',
      status: 'Active',
      active: true,
      image: 'https://images.pexels.com/photos/4551906/pexels-photo-4551906.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'CAT-002',
      name: 'Electronics_test1',
      status: 'Active',
      active: true,
      image: 'https://images.pexels.com/photos/5907481/pexels-photo-5907481.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ]);

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Toggle Function
  const handleActiveToggle = (id) => {
    setCategories(prev => prev.map(item =>
      item.id === id ? { ...item, active: !item.active, status: !item.active ? 'Active' : 'Inactive' } : item
    ));
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    return categories.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true :
        statusFilter === 'active' ? item.active === true : item.active === false;
      return matchesSearch && matchesStatus;
    });
  }, [search, categories, statusFilter]);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: { xs: 2, md: 4 }, fontFamily: "'Outfit', sans-serif" }}>
      <Card sx={{ borderRadius: "15px", p: 3, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>

        {/* Header Section: Exact Buttons from Screenshot */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>Category Management</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 2.5 }}>Import</Button>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 2.5 }}>Export</Button>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 2.5 }}>Add Category</Button>
          </Box>
        </Box>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'start', flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', sm: 300 }, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{ width: { xs: '100%', sm: 160 }, borderRadius: '8px' }}
          >
            <MenuItem value="all">Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <Button
            onClick={() => { setSearch(''); setStatusFilter('all'); }}
            sx={{ color: '#000', fontWeight: 500, textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2 }}
          >
            Reset
          </Button>
        </Box>

        {/* Table Section */}
        <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fafbfd' }}>
              <TableRow>
                {['ID', 'Image', 'Name', 'Status', 'Active / Inactive', 'Action'].map((text) => (
                  <TableCell key={text} align="start" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', py: 2 }}>
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="start" sx={{ color: '#666', fontSize: '0.85rem' }}>{row.id}</TableCell>

                  <TableCell align="start" sx={{ pl: 4 }}> {/* pl: 4 se image thodi jagah chhod kar start hogi */}
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: '22px',
                        overflow: 'hidden',
                        // mx: 'auto' ko hata diya taaki center na ho
                        border: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        component="img"
                        src={row.image}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell align="start" sx={{ color: '#666', fontSize: '0.85rem', justifyContent: 'start' }}>{row.name}</TableCell>

                  <TableCell align="start">
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: row.active ? '#4caf50' : '#f44336' }}>
                      {row.status}
                    </Typography>
                  </TableCell>

                  <TableCell align="start">
                    <IconButton
                      onClick={() => handleActiveToggle(row.id)}
                      disableRipple
                      sx={{ p: 0, color: row.active ? '#00cfd5' : '#ccc' }}
                    >
                      <svg width="34" height="20" viewBox="0 0 24 14">
                        <rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.active ? "1" : "0.2"} />
                        <circle cx={row.active ? 17 : 7} cy="7" r="5" fill={row.active ? "#fff" : "currentColor"} style={{ transition: 'all 0.2s ease' }} />
                      </svg>
                    </IconButton>
                  </TableCell>

                  <TableCell align="start">
                    <Box sx={{ display: 'flex', justifyContent: 'start', color: '#a0a0a0' }}>
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

        {/* Pagination Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
          <Button variant="contained" sx={{ bgcolor: '#9ee8eb', color: '#666', textTransform: 'none', borderRadius: '8px', height: '32px' }}>
            Previous
          </Button>
          <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff' }}>
            1
          </Box>
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', color: '#666', borderColor: '#ddd', height: '32px' }}>
            Next
          </Button>
        </Box>

      </Card>
    </Box>
  )
}

export default Category_Management