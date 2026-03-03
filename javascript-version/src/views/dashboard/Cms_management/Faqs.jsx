'use client'

import React, { useState } from 'react'
import { 
  Box, Card, Typography, TextField, MenuItem, Button, IconButton, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Stack, InputAdornment 
} from '@mui/material'

const Faqs = () => {
  // --- STATE LOGIC ADDED ---
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1 // Aapki requirement ke hisaab se ise change kar sakte hain

  // Aapke screenshots ka exact data
  const [faqs] = useState([
    { 
      id: 1, 
      question: 'How do I create an account?', 
      answer: 'You can create an account by registering through the mobile app or website using your email address and phone number.' 
    },
    { 
      id: 2, 
      question: 'What is Easy Rent?', 
      answer: 'Easy Rent is an online rental platform that allows customers to book products from registered companies and receive delivery through authorized delivery partners.' 
    }
  ])

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      
      {/* Title & Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
          FAQ Management
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#00cfd5', 
            '&:hover': { bgcolor: '#00b8bc' },
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '6px',
            px: 3
          }}
        >
          Add FAQ
        </Button>
      </Box>

      <Card sx={{ p: 0, borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: 'none' }}>
        
        {/* Filters Bar */}
        <Stack direction="row" spacing={1.5} sx={{ p: 2.5 }} alignItems="center">
          <TextField 
            size="small" 
            placeholder="Search by name or email" 
            sx={{ width: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="ri-search-line" style={{ color: '#999' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            select 
            size="small" 
            defaultValue="Select Status" 
            sx={{ width: 160 }}
          >
            <MenuItem value="Select Status">Select Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          
          <IconButton sx={{ border: '1px solid #e0e0e0', borderRadius: '6px', p: '8px' }}>
            <i className="ri-equalizer-line" style={{ fontSize: '18px' }} />
          </IconButton>

          <Button 
            variant="text" 
            sx={{ color: '#333', textTransform: 'none', fontWeight: 600 }}
          >
            Reset
          </Button>
        </Stack>

        {/* Table Section */}
        <TableContainer>
          <Table sx={{ borderTop: '1px solid #eee' }}>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#666', width: '80px' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666', width: '250px' }}>Question</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Answer</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id} sx={{ '&:hover': { bgcolor: '#fcfcfc' } }}>
                  <TableCell sx={{ color: '#666' }}>{faq.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#666' }}>
                    {faq.question}
                  </TableCell>
                  <TableCell sx={{ color: '#555', lineHeight: 1.5 }}>
                    {faq.answer}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton size="small"><i className="ri-eye-line" style={{ color: '#666' }} /></IconButton>
                      <IconButton size="small"><i className="ri-edit-box-line" style={{ color: '#666' }} /></IconButton>
                      <IconButton size="small"><i className="ri-delete-bin-line" style={{ color: '#666' }} /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- PAGINATION SECTION FIXED --- */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3, gap: 1.5, borderTop: '1px solid #eee' }}>
          
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            variant="contained" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '6px',
              bgcolor: '#b2ebed', 
              color: '#161414ff',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#49d3d8ff' },
              '&.Mui-disabled': { bgcolor: '#9ee8eb', color: '#0c0c0cff' }
            }}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              sx={{
                width: 35, 
                height: 35, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: currentPage === i + 1 ? '#008080' : 'transparent', 
                color: currentPage === i + 1 ? '#fff' : '#999',
                border: currentPage === i + 1 ? 'none' : '1px solid #eee'
              }}
            >
              {i + 1}
            </Box>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            variant="outlined" 
            sx={{ 
              textTransform: 'none', 
              borderRadius: '6px',
              borderColor: '#eee',
              color: '#999',
              '&:hover': { borderColor: '#ccc' }
            }}
          >
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default Faqs