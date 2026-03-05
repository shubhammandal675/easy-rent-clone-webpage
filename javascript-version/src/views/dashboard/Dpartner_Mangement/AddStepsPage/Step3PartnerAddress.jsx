'use client'
import React from 'react'
import { Grid, TextField, Typography, MenuItem, Select, Box } from '@mui/material'

const Step3PartnerAddress = ({ formData, setFormData, mode = 'add' }) => {
  const isView = mode === 'view';

  // Label aur Input ke beech ka gap fix kiya (mb: 0.5)
  const LabelStyle = { 
    fontSize: '0.85rem', 
    fontWeight: 600, 
    color: '#444', 
    mb: 0.5, 
    display: 'block' 
  }

  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '45px',
      backgroundColor: isView ? '#f9f9f9' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    }
  }

  const SelectStyle = {
    borderRadius: '8px',
    height: '45px',
    fontSize: '0.85rem',
    backgroundColor: isView ? '#f9f9f9' : '#fff',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
  }

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <Box sx={{minHeight:'273px'}}>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3.5, color: '#333' }}>
        {isView ? 'Partner Address' : 'Enter Partner Address'}
      </Typography>

      {/* Grid container spacing ko '3' rakha hai vertical gap ke liye */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Address Line 1</Typography>
          <TextField 
            fullWidth 
            name="address"
            disabled={isView}
            value={formData?.address || ''}
            onChange={handleChange}
            placeholder="Enter Address" 
            sx={InputStyle} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>City</Typography>
          <TextField 
            fullWidth 
            name="city"
            disabled={isView}
            value={formData?.city || ''}
            onChange={handleChange}
            placeholder="Enter City" 
            sx={InputStyle} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>State</Typography>
          <TextField 
            fullWidth 
            name="state"
            disabled={isView}
            value={formData?.state || ''}
            onChange={handleChange}
            placeholder="Enter State" 
            sx={InputStyle} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Country</Typography>
          <Select 
            fullWidth 
            name="country"
            disabled={isView}
            value={formData?.country || 'UAE'} 
            onChange={handleChange}
            sx={SelectStyle}
          >
            <MenuItem value="UAE">United Arab Emirates (the)</MenuItem>
            <MenuItem value="India">India</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Postal Code</Typography>
          <TextField 
            fullWidth 
            name="pincode"
            disabled={isView}
            value={formData?.pincode || ''}
            onChange={handleChange}
            placeholder="Enter Postal Code" 
            sx={InputStyle} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step3PartnerAddress