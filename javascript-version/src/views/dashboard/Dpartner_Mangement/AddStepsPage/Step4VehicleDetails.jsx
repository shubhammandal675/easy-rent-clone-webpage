'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, MenuItem, Select } from '@mui/material'

const Step4AddVehicle = ({ formData, setFormData, mode = 'add' }) => {
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
      height: '45px',
      backgroundColor: isView ? '#f9f9f9' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    }
  }

  const UploadBoxStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    cursor: isView ? 'default' : 'pointer',
    '&:hover': { borderColor: isView ? '#e0e0e0' : '#00cfd5' }
  }

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <Box sx={{ minHeight: '300px' }}>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        {isView ? 'Vehicle Details' : 'Enter Vehicle Information'}
      </Typography>

      <Grid container spacing={3}>
        {/* Vehicle Type Selection */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Vehicle Type</Typography>
          <Select
            fullWidth
            name="vehicleType"
            value={formData?.vehicleType || ''}
            onChange={handleChange}
            disabled={isView}
            displayEmpty
            sx={{ borderRadius: '8px', height: '45px', fontSize: '0.85rem' }}
          >
            <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
            <MenuItem value="bike">Commercial</MenuItem>
            <MenuItem value="car">Two Wheeler</MenuItem>
            <MenuItem value="truck">Four wheeler</MenuItem>
          </Select>
        </Grid>

        {/* Max Load */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Max Load</Typography>
          <TextField 
            fullWidth 
            name="maxLoad"
            placeholder="" 
            value={formData?.maxLoad || ''}
            onChange={handleChange}
            disabled={isView}
            sx={InputStyle} 
          />
        </Grid>

        {/* Registration Number */}
        <Grid item xs={12} md={12}>
          <Typography sx={LabelStyle}>Registration Number</Typography>
          <TextField 
            fullWidth 
            name="vehicleRegNo"
            placeholder="Enter Registration Number" 
            value={formData?.vehicleRegNo || ''}
            onChange={handleChange}
            disabled={isView}
            sx={InputStyle} 
          />
        </Grid>


        {/* Vehicle Document Upload (Mulkiya/Insurance) */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Registration Document </Typography>
          <Box sx={UploadBoxStyle} component="label">
             {!isView && <input hidden type="file" onChange={(e) => console.log("Vehicle Doc Selected")} />}
             <i className="ri-file-upload-line" style={{ fontSize: '40px', color: '#00cfd5' }} />
             <Typography sx={{ fontSize: '0.75rem', color: '#888', mt: 1 }}>
               Click to upload document
             </Typography>
          </Box>
        </Grid>

       <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Insurance Document </Typography>
          <Box sx={UploadBoxStyle} component="label">
             {!isView && <input hidden type="file" onChange={(e) => console.log("Vehicle Doc Selected")} />}
             <i className="ri-file-upload-line" style={{ fontSize: '40px', color: '#00cfd5' }} />
             <Typography sx={{ fontSize: '0.75rem', color: '#888', mt: 1 }}>
               Click to upload document
             </Typography>
          </Box>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Step4AddVehicle