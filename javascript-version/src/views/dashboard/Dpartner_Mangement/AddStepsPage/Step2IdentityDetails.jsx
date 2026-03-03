'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, Button } from '@mui/material'

const Step2CompanyDetails = ({ mode = 'add', formData, setFormData }) => {
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
      // View mode mein background light grey
      backgroundColor: isView ? '#f9f9f9' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    },
    '& .MuiInputBase-input': { padding: '10px 14px' },
    '& .Mui-disabled': {
      WebkitTextFillColor: '#555', // Disabled text color readable rahe
    }
  }

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        {isView ? 'Company Details' : 'Enter Company Details'}
      </Typography>

      {/* Profile Upload Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
        <Box sx={{
          width: 80,
          height: 80,
          backgroundColor: '#222',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          overflow: 'hidden',
          border: '2px solid #f0f0f0'
        }}>
          {formData?.companyLogo ? (
             <img src={formData.companyLogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
             <i className="ri-user-fill" style={{ fontSize: '60px' }} />
          )}
        </Box>

        {/* CONDITION: Upload button sirf Add ya Edit mode mein dikhega */}
        {!isView && (
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              mt: 2,
              backgroundColor: '#00cfd5',
              textTransform: 'none',
              width: '80px',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#00b8bc' }
            }}
          >
            Upload
            <input hidden accept="image/*" type="file" onChange={(e) => {/* logo upload logic */}} />
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Company Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Company Name</Typography>
          <TextField 
            fullWidth 
            size="small" 
            name="companyName"
            disabled={isView}
            value={formData?.companyName || ''}
            onChange={handleChange}
            placeholder="Enter company name" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Business Type */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Business Type</Typography>
          <TextField 
            fullWidth 
            size="small" 
            name="businessType"
            disabled={isView}
            value={formData?.businessType || ''}
            onChange={handleChange}
            placeholder="Enter business type" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Registration Number */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Registration Number</Typography>
          <TextField 
            fullWidth 
            size="small" 
            name="regNumber"
            disabled={isView}
            value={formData?.regNumber || ''}
            onChange={handleChange}
            placeholder="Enter registration number" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Date of Registration */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Date of Registration / Incorporation</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            name="regDate"
            disabled={isView}
            value={formData?.regDate || ''}
            onChange={handleChange}
            sx={InputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Website */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Website (Optional)</Typography>
          <TextField 
            fullWidth 
            size="small" 
            name="website"
            disabled={isView}
            value={formData?.website || ''}
            onChange={handleChange}
            placeholder="Enter website" 
            sx={InputStyle} 
          />
        </Grid>

        {/* Company Description */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Company Description (Optional)</Typography>
          <TextField 
            fullWidth 
            size="small" 
            name="description"
            disabled={isView}
            value={formData?.description || ''}
            onChange={handleChange}
            placeholder="Enter company description" 
            sx={InputStyle} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step2CompanyDetails