'use client'
import React from 'react'
import { Grid, TextField, Typography, MenuItem, Select, Box, FormControl, FormHelperText } from '@mui/material'

const Step3CompanyAddress = ({ mode = 'add', formData, setFormData, errors = {}, setErrors }) => {
  const isView = mode === 'view';

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
      backgroundColor: isView ? '#f5f5f5' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    },
    // Hover feature: hide error message
    '&:hover .MuiFormHelperText-root': {
      visibility: 'hidden', 
    },
    '& .MuiInputBase-input': { padding: '10px 14px' },
    '& .Mui-disabled': { WebkitTextFillColor: '#222' }
  }

  const handleChange = (e) => {
    if (!isView) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      // Typing logic: clear error
      if (setErrors && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        {isView ? 'Company Address (View Only)' : 'Enter Company Address'}
      </Typography>

      {/* --- Registered Address Section --- */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Registered Address Line 1</Typography>
          <TextField 
            fullWidth name="addressLine1" disabled={isView}
            value={formData?.addressLine1 || ''} onChange={handleChange}
            error={!!errors.addressLine1} helperText={errors.addressLine1}
            placeholder="Enter Address" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>City</Typography>
          <TextField 
            fullWidth name="city" disabled={isView}
            value={formData?.city || ''} onChange={handleChange}
            error={!!errors.city} helperText={errors.city}
            placeholder="Enter City" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>State</Typography>
          <TextField 
            fullWidth name="state" disabled={isView}
            value={formData?.state || ''} onChange={handleChange}
            error={!!errors.state} helperText={errors.state}
            placeholder="Enter State" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Country</Typography>
          <FormControl fullWidth size="small" error={!!errors.country} sx={InputStyle}>
            <Select 
              name="country" disabled={isView}
              value={formData?.country || 'UAE'} onChange={handleChange}
              sx={{ borderRadius: '8px', height: '42px' }}
            >
              <MenuItem value="UAE">United Arab Emirates (the)</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
            <FormHelperText>{errors.country}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Postal Code</Typography>
          <TextField 
            fullWidth name="postalCode" type="number" disabled={isView}
            value={formData?.postalCode || ''} onChange={handleChange}
            error={!!errors.postalCode} helperText={errors.postalCode}
            placeholder="Enter Postal Code" sx={InputStyle} 
          />
        </Grid>
      </Grid>

      {/* --- Pickup / Warehouse Address Section --- */}
      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2, color: '#333' }}>
        Pickup / Warehouse Address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Warehouse Address</Typography>
          <TextField 
            fullWidth name="warehouseAddress" disabled={isView}
            value={formData?.warehouseAddress || ''} onChange={handleChange}
            error={!!errors.warehouseAddress} helperText={errors.warehouseAddress}
            placeholder="Enter Address" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>City</Typography>
          <TextField 
            fullWidth name="warehouseCity" disabled={isView}
            value={formData?.warehouseCity || ''} onChange={handleChange}
            error={!!errors.warehouseCity} helperText={errors.warehouseCity}
            placeholder="Enter City" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>State</Typography>
          <TextField 
            fullWidth name="warehouseState" disabled={isView}
            value={formData?.warehouseState || ''} onChange={handleChange}
            error={!!errors.warehouseState} helperText={errors.warehouseState}
            placeholder="Enter State" sx={InputStyle} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Country</Typography>
          <FormControl fullWidth size="small" error={!!errors.warehouseCountry} sx={InputStyle}>
            <Select 
              name="warehouseCountry" disabled={isView}
              value={formData?.warehouseCountry || 'Barbados'} onChange={handleChange}
              sx={{ borderRadius: '8px', height: '42px' }}
            >
              <MenuItem value="Barbados">Barbados</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
            <FormHelperText>{errors.warehouseCountry}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Postal Code</Typography>
          <TextField 
            fullWidth name="warehousePostalCode" type="number" disabled={isView}
            value={formData?.warehousePostalCode || ''} onChange={handleChange}
            error={!!errors.warehousePostalCode} helperText={errors.warehousePostalCode}
            placeholder="Enter Postal Code" sx={InputStyle} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step3CompanyAddress