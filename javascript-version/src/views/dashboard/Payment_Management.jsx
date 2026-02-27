'use client'

import React, { useState } from 'react'
import {
  Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Box, IconButton,
  TextField, Button, InputAdornment, Avatar
} from '@mui/material'

const Payment_Management = () => {
  const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

const [payments] = useState([
  {
    id: 'ER101',
    name: 'Amit Sharma',
    email: 'amit.sharma@gmail.com',
    payment: '₹4,500',
    range: '5 Jan 2026 - 5 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' 
  },
  {
    id: 'ER102',
    name: 'Priya Verma',
    email: 'priya.verma@gmail.com',
    payment: '₹7,200',
    range: '10 Jan 2026 - 10 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  {
    id: 'ER103',
    name: 'Rahul Singh',
    email: 'rahul.singh@gmail.com',
    payment: '₹3,800',
    range: '12 Jan 2026 - 12 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  {
    id: 'ER104',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@gmail.com',
    payment: '₹6,000',
    range: '15 Jan 2026 - 15 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  {
    id: 'ER105',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@gmail.com',
    payment: '₹9,500',
    range: '18 Jan 2026 - 18 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  {
    id: 'ER106',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@gmail.com',
    payment: '₹2,900',
    range: '20 Jan 2026 - 20 Feb 2026',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  }
]);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6 }}>
      <Card sx={{ borderRadius: "15px", p: 6 , boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: outfitFont }}>
            Payment Management
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}>
            Export
          </Button>
        </Box>

        {/* Filters Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by name or email"
            sx={{ width: 250, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, '& .MuiInputBase-input': { fontFamily: outfitFont } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
          />
          
          {/* Date Range Picker Placeholder */}
          <TextField
            size="small"
            placeholder="Select date range"
            sx={{ width: 180, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, '& . MuiInputBase-input': { fontFamily: outfitFont } }}
            InputProps={{ endAdornment: <InputAdornment position="end"><i className="ri-calendar-line" /></InputAdornment> }}
          /> 

          <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '7px' }}>
            <i className="ri-arrow-up-down-line" />
          </IconButton>
          
          <Button sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont }}>
            Reset
          </Button>
        </Box>


{/* Table Section */}
<TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
  <Table>
    <TableHead sx={{ backgroundColor: '#fafbfd' }}>
      <TableRow>
        {['ID', 'Image', 'Name', 'Email', 'Payment', 'Range', 'Action'].map((head) => (
          <TableCell 
            key={head} 
            align="left" 
            sx={{ 
              fontWeight: 600, 
              color: '#8e98a8', 
              fontSize: '0.75rem', 
              fontFamily: outfitFont, 
              py: 2,
              px: 2 
            }}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {payments.map((row) => (
        <TableRow key={row.id} hover>
          <TableCell align="left" sx={{ fontFamily: outfitFont, fontSize: '0.85rem', color: '#666', px: 2 }}>
            {row.id}
          </TableCell>
          <TableCell align="left" sx={{ px: 2 }}>
            <Avatar src={row.img} sx={{ width: 35, height: 35 }} />
          </TableCell>
          <TableCell align="left" sx={{ fontFamily: outfitFont, fontSize: '0.85rem', fontWeight: 500, px: 2 }}>
            {row.name}
          </TableCell>
          <TableCell align="left" sx={{ fontFamily: outfitFont, fontSize: '0.85rem', color: '#666', px: 2 }}>
            {row.email}
          </TableCell>
          <TableCell align="left" sx={{ fontFamily: outfitFont, fontSize: '0.85rem', px: 2 }}>
            {row.payment}
          </TableCell>
          <TableCell align="left" sx={{ fontFamily: outfitFont, fontSize: '0.85rem', color: '#666', px: 2 }}>
            {row.range}
          </TableCell>
          <TableCell align="left" sx={{ px: 2 }}>
            <Typography 
              sx={{ 
                fontSize: '0.85rem', 
                fontFamily: outfitFont, 
                cursor: 'pointer',
                fontWeight: 500 
              }}
            >
              Rollout
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


        {/* Pagination (Similar to your other pages) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
          <Button sx={{ bgcolor: '#9ee8eb', color: '#666', textTransform: 'none', borderRadius: '8px', height: 32, fontFamily: outfitFont }}>Previous</Button>
          <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontWeight: 600 }}>1</Box>
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#ddd', color: '#666', height: 32, fontFamily: outfitFont }}>Next</Button>
        </Box>

      </Card>
    </Box>
  )
}

export default Payment_Management;