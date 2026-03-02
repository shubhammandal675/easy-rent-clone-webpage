'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, Button, Avatar } from '@mui/material'

const Step2CompanyDetails = () => {
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

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        Enter Company Details
      </Typography>

      {/* Profile Upload Section */}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
        <Box sx={{
          width: 80,
          height: 80,
          backgroundColor: '#020202ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffffff',
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

      <Grid container spacing={3}>
        {/* Company Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Company Name</Typography>
          <TextField fullWidth 
          size="small"
          placeholder="tester company" sx={InputStyle} />
        </Grid>

        {/* Business Type */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Business Type</Typography>
          <TextField fullWidth
          size="small"
          placeholder="Enter business type" sx={InputStyle} />
        </Grid>

        {/* Registration Number */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Registration Number</Typography>
          <TextField fullWidth 
          size="small"
          placeholder="Enter registration number" sx={InputStyle} />
        </Grid>

        {/* Date of Registration */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Date of Registration / Incorporation</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            sx={InputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Website (Optional) */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Website (Optional)</Typography>
          <TextField fullWidth 
          size="small"
          placeholder="Enter website" sx={InputStyle} />
        </Grid>

        {/* Company Description (Optional) */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Company Description (Optional)</Typography>
          <TextField fullWidth
          size="small"
          placeholder="Enter company description" sx={InputStyle} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step2CompanyDetails