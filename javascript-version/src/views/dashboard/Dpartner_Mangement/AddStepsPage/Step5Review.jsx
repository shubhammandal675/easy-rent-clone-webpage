'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, Paper } from '@mui/material'

const Step5BusinessVerification = () => {
  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 0.8, display: 'block' }
  
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '42px',
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#00cfd5' },
    },
    '& .MuiInputBase-input': { padding: '10px 14px' }
  }

  // Upload box component taaki code baar-baar na likhna pade
  const UploadBox = ({ title }) => (
    <Box sx={{ width: '100%' }}>
      <Typography sx={LabelStyle}>{title}</Typography>
      <Paper
        variant="outlined"
        sx={{
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #e0e0e0',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#f0fbff', borderColor: '#00cfd5' }
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
            alt="file icon" 
            style={{ width: '30px', opacity: 0.5 }} 
          />
        </Box>
      </Paper>
    </Box>
  )

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Upload Buttons Row */}
        <Grid item xs={12} md={6}>
          <UploadBox title="Upload Registration Certificate" />
        </Grid>
        <Grid item xs={12} md={6}>
          <UploadBox title="Upload Tax Certificate" />
        </Grid>

        {/* Issuing Authority */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Issuing Country / Authority</Typography>
          <TextField fullWidth placeholder="Enter Issuing Country / Authority" sx={InputStyle} />
        </Grid>

        {/* Tax ID Number */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Tax Identification Number (VAT / GST / EIN)</Typography>
          <TextField fullWidth placeholder="Enter Tax Identification Number (VAT / GST / EIN)" sx={InputStyle} />
        </Grid>

        {/* Trade License (Full Width) */}
        <Grid item xs={12}>
          <Typography sx={LabelStyle}>Trade / Operating License (Optional)</Typography>
          <TextField fullWidth placeholder="Enter Trade / Operating License" sx={InputStyle} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step5BusinessVerification