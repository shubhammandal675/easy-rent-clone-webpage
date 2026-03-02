'use client'
import React from 'react'
import { Grid, TextField, Typography, MenuItem, Select, Box } from '@mui/material'

const Step3CompanyAddress = () => {
  const LabelStyle = { 
    fontSize: '0.85rem', 
    fontWeight: 600, 
    color: '#333', 
    mb: 0.8, 
    display: 'block' 
  }

  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '42px',
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: '#00cfd5' },
    },
    '& .MuiInputBase-input': { padding: '10px 14px' }
  }

  const SelectStyle = {
    borderRadius: '8px',
    height: '42px',
    fontSize: '0.85rem',
    color: '#333',
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00cfd5' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00cfd5' },
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        Enter Company Address
      </Typography>

      
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Registered Address Line 1</Typography>
          <TextField fullWidth placeholder="Enter Address" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>City</Typography>
          <TextField fullWidth placeholder="Enter City" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>State</Typography>
          <TextField fullWidth placeholder="Enter State" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Country</Typography>
          <Select fullWidth defaultValue="UAE" sx={SelectStyle}>
            <MenuItem value="UAE">United Arab Emirates (the)</MenuItem>
            <MenuItem value="India">India</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Postal Code</Typography>
          <TextField fullWidth placeholder="2" type="number" sx={InputStyle} />
        </Grid>
      </Grid>

      {/* --- Pickup / Warehouse Address Section --- */}
      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2, color: '#333' }}>
        Pickup/ Warehouseaddress
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>WareHouseAddress</Typography>
          <TextField fullWidth placeholder="Enter Address" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>City</Typography>
          <TextField fullWidth placeholder="Enter City" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>State</Typography>
          <TextField fullWidth placeholder="Enter State" sx={InputStyle} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Country</Typography>
          <Select fullWidth defaultValue="Barbados" sx={SelectStyle}>
            <MenuItem value="Barbados">Barbados</MenuItem>
            <MenuItem value="India">India</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Postal Code</Typography>
          <TextField fullWidth placeholder="3" type="number" sx={InputStyle} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step3CompanyAddress