'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const SubCategory_Management = () => {
  const [subCategories, setSubCategories] = useState([
    {
      id: 'SUB-002',
      category: 'Bakeware',
      subCategory: 'Baking Dishes',
      status: 'Active',
      active: true,
      image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=150' 
    },
    {
      id: 'SUB-001',
      category: 'Bakeware',
      subCategory: 'Ramekins',
      status: 'Active',
      active: true,
      image: 'https://images.pexels.com/photos/4551906/pexels-photo-4551906.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ]);

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Toggle Function Fix
  const handleActiveToggle = (id) => {
    setSubCategories(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active, status: !item.active ? 'Active' : 'Inactive' } : item
    ));
  };

  const filteredData = useMemo(() => {
    return subCategories.filter(item => {
      const matchesSearch = item.subCategory.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ? true :
          statusFilter === 'active' ? item.active === true :
            item.active === false;
      return matchesSearch && matchesStatus;
    });
  }, [search, subCategories, statusFilter]);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4, fontFamily: "'Outfit', sans-serif" }}>
      <Card sx={{ borderRadius: "15px", p: 4, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>Sub Category Management</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', px: 3 }}>Export</Button>
            <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '8px', px: 3 }}>Add Sub Category</Button>
          </Box>
        </Box>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by category or subcategory"
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
          <Button onClick={() => { setSearch(''); setStatusFilter('all'); }} sx={{ color: '#00cfd5', fontWeight: 600, textTransform: 'none' }}>Reset</Button>
        </Box>

        {/* Table Section */}
        <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fafbfd' }}>
              <TableRow>
                {/* Labels sequence aligned with Body */}
                {['ID', 'Image', 'Category', 'Sub Category', 'Status', 'Active / Inactive', 'Action'].map((text) => (
                  <TableCell key={text} align="center" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', py: 2 }}>
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="center" sx={{ color: '#666' }}>{row.id}</TableCell>
                  
                  {/* Image Cell Fixed */}
                  <TableCell align="center">
                    <Box sx={{ 
                      width: 45, height: 45, borderRadius: '26px', overflow: 'hidden', 
                      mx: 'auto', border: '1px solid #f0f0f0' 
                    }}>
                      <Box component="img" src={row.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ color: '#666' }}>{row.category}</TableCell>
                  <TableCell align="center" sx={{ color: '#666', fontWeight: 500 }}>{row.subCategory}</TableCell>

                  {/* Status Text with Dynamic Color */}
                  <TableCell align="center">
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: row.active ? '#4caf50' : '#f44336' }}>
                      {row.status}
                    </Typography>
                  </TableCell>

                  {/* Toggle Switch Fixed with handleActiveToggle */}
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => handleActiveToggle(row.id)}
                      disableRipple
                      sx={{ 
                        p: 0, color: row.active ? '#00cfd5' : '#ccc',
                        backgroundColor: 'transparent !important' 
                      }}
                    >
                      <svg width="34" height="20" viewBox="0 0 24 14">
                        <rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.active ? "1" : "0.2"} />
                        <circle cx={row.active ? 17 : 7} cy="7" r="5" fill={row.active ? "#fff" : "currentColor"} style={{ transition: '0.2s' }} />
                      </svg>
                    </IconButton>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, color: '#a0a0a0' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Previous</Button>
          <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#333', color: '#fff' }}>1</Box>
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>Next</Button>
        </Box>

      </Card>
    </Box>
  )
}

export default SubCategory_Management