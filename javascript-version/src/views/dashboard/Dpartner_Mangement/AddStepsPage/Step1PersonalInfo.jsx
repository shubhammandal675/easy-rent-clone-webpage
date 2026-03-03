'use client'
import React from 'react'
import { Grid, TextField, Typography, MenuItem, Select, InputAdornment, Box } from '@mui/material'

const Step1PersonalInfo = ({ mode = 'add', formData, setFormData }) => {
  const isView = mode === 'view';

  const LabelStyle = { 
    fontSize: '0.85rem', 
    fontWeight: 600, 
    color: '#333', 
    mb: 1, 
    display: 'block' 
  }
  
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      backgroundColor: isView ? '#f5f5f5' : '#fff', 
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    },
    // View mode mein text color ko dark rakhne ke liye fix
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#222', 
      opacity: 1
    },
    '& .Mui-disabled': {
      color: '#222',
      WebkitTextFillColor: '#222',
    }
  }

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 4, color: '#333' }}>
        {isView ? 'Personal Information (View Only)' : 'Enter Personal Information'}
      </Typography>

      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>First Name</Typography>
          <TextField 
            fullWidth
            size="small"
            name="firstName"
            disabled={isView}
            value={formData?.firstName || ''}
            onChange={handleChange}
            placeholder="Enter first name" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Last Name</Typography>
          <TextField 
            fullWidth 
            size="small"
            name="lastName"
            disabled={isView}
            value={formData?.lastName || ''}
            onChange={handleChange}
            placeholder="Enter last name" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Email</Typography>
          <TextField 
            fullWidth 
            size="small"
            name="email"
            disabled={isView}
            value={formData?.email || ''}
            onChange={handleChange}
            placeholder="Enter Email" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Contact Number */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Contact Number</Typography>
          <TextField 
            fullWidth 
            size="small"
            name="contactNumber"
            disabled={isView}
            value={formData?.contactNumber || ''}
            onChange={handleChange}
            placeholder="00000-00000" 
            sx={InputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pr: 1, borderRight: '1px solid #ddd', mr: 1 }}>
                    <img src="https://flagcdn.com/w20/in.png" alt="India" style={{ width: 18 }} />
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>+91</Typography>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Currency Dropdown */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Currency</Typography>
          <Select
            fullWidth
            size="small"
            name="currency"
            disabled={isView}
            value={formData?.currency || 'INR'} // Default INR rakha hai
            onChange={handleChange}
            sx={{ 
                borderRadius: '8px', 
                backgroundColor: isView ? '#f5f5f5' : '#fff',
                '& .MuiSelect-select.Mui-disabled': { WebkitTextFillColor: '#222' }
            }}
          >
            <MenuItem value="USD">USD - US Dollar</MenuItem>
            <MenuItem value="INR">INR - Indian Rupee</MenuItem>
            <MenuItem value="AED">AED - Dirham</MenuItem>
          </Select>
        </Grid>

        {/* Language Dropdown */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Language</Typography>
          <Select
            fullWidth
            size="small"
            name="language"
            disabled={isView}
            value={formData?.language || 'English'} 
            onChange={handleChange}
            sx={{ 
                borderRadius: '8px', 
                backgroundColor: isView ? '#f5f5f5' : '#fff',
                '& .MuiSelect-select.Mui-disabled': { WebkitTextFillColor: '#222' }
            }}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Arabic">Arabic</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step1PersonalInfo