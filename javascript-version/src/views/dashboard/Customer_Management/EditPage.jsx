'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select, InputAdornment } from '@mui/material'

const EditPage = ({ data, onBack, onUpdate }) => {
  // State to handle form changes
  const [formData, setFormData] = useState({
    firstName: data?.name?.split(' ')[0] || 'Rajan',
    lastName: data?.name?.split(' ')[1] || 'sir',
    email: data?.email || 'rajan@grr.la',
    number: data?.number || '+244 123 455 558 855',
    currency: data?.currency || 'EUR',
    language: data?.language || 'English'
  })

  // Style to keep label stable and NOT on the border line
  const LabelStyle = {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#888',
    mb: 1,
    display: 'block'
  }

  const InputStyle = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px', 
      height: '50px',
      backgroundColor: '#fcfcfc',
    },
    // Removed disabled text color fix to allow normal typing
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>
            Update Customer
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={() => onUpdate(formData)}
              sx={{ 
                backgroundColor: '#00cfd5', 
                textTransform: 'none', 
                fontWeight: 600, 
                px: 4,
                '&:hover': { backgroundColor: '#00b8bc' }
              }}
            >
              Update
            </Button>
            <Button 
              variant="outlined" 
              onClick={onBack}
              sx={{ 
                color: '#00cfd5', 
                borderColor: '#00cfd5', 
                textTransform: 'none', 
                fontWeight: 600, 
                px: 4,
                '&:hover': { borderColor: '#00cfd5', backgroundColor: 'rgba(0, 207, 213, 0.05)' }
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* Image Section - Aligned to LEFT */}
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
            component="label" // Allows file upload
            size="small" 
            sx={{ 
              mt: 2, 
              backgroundColor: '#00cfd5', 
              textTransform: 'none',
              width: '80px', 
              borderRadius: '8px'
            }}
          >
            Upload 
            <input hidden accept="image/*" type="file" />
          </Button>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              sx={InputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Email</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              sx={InputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField 
              fullWidth 
              placeholder="Enter number"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <Select 
              fullWidth 
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              sx={{ borderRadius: '8px', height: '50px', backgroundColor: '#fcfcfc' }}
            >
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="TRY">TRY</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <Select 
              fullWidth 
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              sx={{ borderRadius: '8px', height: '50px', backgroundColor: '#fcfcfc' }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="Turkish">Turkish</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default EditPage