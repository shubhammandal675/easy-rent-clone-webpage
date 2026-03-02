'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select } from '@mui/material'

const AddPage = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', number: '', currency: 'USD', language: 'German'
  })

  const LabelStyle = {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#666',
    mb: 1,
    display: 'block'
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 7, borderRadius: '15px' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 8 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Add Customer</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>Add Customer</Button>
            <Button variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none' }} onClick={onBack}>Back</Button>
          </Box>
        </Box>

        {/* FIX: Image Section now aligned to LEFT */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            backgroundColor: '#eef2ff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#54a5d4',
            overflow: 'hidden',
            border: '2px solid #f0f0f0'
          }}>
            <i className="ri-user-fill" style={{ fontSize: '60px' }} />
          </Box>
          <Button 
            variant="contained" 
            size="small" 
            sx={{ 
              mt: 2, 
              backgroundColor: '#00cfd5', 
              textTransform: 'none',
              width: '80px', // Avatar ki width ke barabar
              borderRadius: '8px'
            }}
          >
            Upload 
          </Button>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter first name" 
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter last name" 
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Email Address</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter email address" 
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter contact number" 
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <Select 
              fullWidth 
              value={formData.currency} 
              sx={{ borderRadius: '8px', height: '45px' }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="TRY">TRY</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <Select 
              fullWidth 
              value={formData.language} 
              sx={{ borderRadius: '8px', height: '45px' }}
            >
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Turkish">Turkish</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
export default AddPage