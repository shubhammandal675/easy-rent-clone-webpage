'use client'

import React, { useState, useMemo } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, MenuItem, Select, Button, InputAdornment
} from '@mui/material'

const Order_Management = () => {
  // Common Font Style
  const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

  const [orders, setOrders] = useState([
    { id: 'ER101', product: 'Sofa', quantity: 10, price: '$2399', deliveryType: 'SELF', status: 'Placed' },
    { id: 'ER102', product: 'Chair', quantity: 10, price: '$2399', deliveryType: 'SELF', status: 'Placed' },
    { id: 'ER103', product: 'Sofa', quantity: 10, price: '$2399', deliveryType: 'SELF', status: 'Placed' },
    { id: 'ER104', product: 'Table', quantity: 10, price: '$2399', deliveryType: 'SELF', status: 'Placed' },
    { id: 'ER105', product: 'Sofa', quantity: 10, price: '$2399', deliveryType: 'SELF', status: 'Placed' },
  ]);

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredData = useMemo(() => {
    return orders.filter(item => {
      const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, orders, statusFilter]);

  return (
    <Box sx={{
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      p: 6,
      fontFamily: outfitFont // Base container font
    }}>
      <Card sx={{
        borderRadius: "15px",
        p: 6,
        backgroundColor: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #eef0f2'
      }}>

        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#000',
            fontFamily: outfitFont
          }}>
            Order Management
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#00cfd5',
              '&:hover': { bgcolor: '#00b8bc' },
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              fontFamily: outfitFont,
              fontWeight: 500
            }}
          >
            Export
          </Button>
        </Box>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
              '& .MuiInputBase-input': { fontFamily: outfitFont, fontSize: '0.9rem' }
            }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              width: { xs: '100%', sm: 160 },
              borderRadius: '8px',
              fontFamily: outfitFont,
              fontSize: '0.9rem'
            }}
          >
            <MenuItem value="all" sx={{ fontFamily: outfitFont }}>Select Status</MenuItem>
            <MenuItem value="Placed" sx={{ fontFamily: outfitFont }}>Placed</MenuItem>
          </Select>
          <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '7px' }}>
            <i className="ri-arrow-up-down-line" style={{ fontSize: '1.2rem' }} />
          </IconButton>
          <Button
            onClick={() => { setSearch(''); setStatusFilter('all'); }}
            sx={{
              color: '#000',
              fontWeight: 400,
              textTransform: 'none',
              border: '1px solid #ddd',
              borderRadius: '8px',
              px: 2,
              fontFamily: outfitFont
            }}
          >
            Reset
          </Button>
        </Box>


        {/* Table Section */}
        <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fafbfd' }}>
              <TableRow>
                {['ID', 'Product', 'Quantity', 'Price', 'Delivery Type', 'Status', 'Action'].map((text) => (
                  <TableCell
                    key={text}
                    align={text === 'ID' || text === 'Product' ? 'left' : 'center'}
                    sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', py: 2, px: 2, fontFamily: outfitFont }}
                  >
                    {text.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="left" sx={{ padding: '12px 16px', fontSize: '0.85rem', fontFamily: outfitFont, color: '#666' }}>
                    {row.id}
                  </TableCell>
                  <TableCell align="left" sx={{ padding: '12px 16px', fontSize: '0.85rem', fontFamily: outfitFont, fontWeight: 500 }}>
                    {row.product}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '12px 16px', fontSize: '0.85rem', fontFamily: outfitFont }}>
                    {row.quantity}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '12px 16px', fontSize: '0.85rem', fontFamily: outfitFont }}>
                    {row.price}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '12px 16px', fontSize: '0.85rem', fontFamily: outfitFont }}>
                    {row.deliveryType}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '12px 16px', fontSize: '0.85rem',  fontFamily: outfitFont, }}>
                    {row.status}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: '12px 16px' }}>
                    <IconButton size="small" sx={{ color: '#8e98a8' }}>
                      <i className="ri-eye-line" style={{ fontSize: '1.1rem' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#9ee8eb',
              color: '#666',
              textTransform: 'none',
              borderRadius: '8px',
              height: '32px',
              boxShadow: 'none',
              fontFamily: outfitFont,
              fontWeight: 500
            }}
          >
            Previous
          </Button>
          <Box sx={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            bgcolor: '#003b3d',
            color: '#fff',
            fontFamily: outfitFont,
            fontWeight: 600
          }}>
            1
          </Box>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              color: '#666',
              borderColor: '#ddd',
              height: '32px',
              fontFamily: outfitFont,
              fontWeight: 500
            }}
          >
            Next
          </Button>
        </Box>

      </Card>
    </Box>
  )
}

export default Order_Management