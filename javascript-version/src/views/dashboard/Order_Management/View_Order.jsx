'use client'
import React from 'react'
import { Box, Card, Typography, TextField, Button, Grid } from '@mui/material'

const View_Order = ({ order, onBack }) => {
  const outfitFont = "'Outfit', sans-serif";

  // Label styling as per your screenshots
  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#8e98a8',
    mb: 1,
    fontFamily: outfitFont
  };

  // TextField styling to make it look like the screenshot (Read-only)
  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#eef0f2' },
    },
    '& .MuiInputBase-input': {
      fontFamily: outfitFont,
      fontSize: '0.9rem',
      color: '#666'
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 4 }}>
      <Card sx={{ 
        borderRadius: "15px", 
        p: 5, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)', 
        border: '1px solid #eef0f2' 
      }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: outfitFont }}>
            View Orders
          </Typography>
          <Button 
            variant="outlined" 
            onClick={onBack}
            sx={{ 
              textTransform: 'none', 
              borderRadius: '8px', 
              borderColor: '#00cfd5', 
              color: '#00cfd5',
              px: 4,
              fontFamily: outfitFont,
              fontWeight: 600,
              '&:hover': { borderColor: '#00b8bc', bgcolor: 'rgba(0, 207, 213, 0.04)' }
            }}
          >
            Back
          </Button>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={3}>
          {/* Order ID */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Order ID</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.id || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>

          {/* Product Name */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Product Name</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.product || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Quantity</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.quantity || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Price</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.price || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>

          {/* Delivery Type */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Delivery Type</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.deliveryType || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Status</Typography>
            <TextField 
              fullWidth 
              size="small"
              value={order?.status || ''} 
              readOnly
              sx={fieldStyle}
            />
          </Grid>
        </Grid>

      </Card>
    </Box>
  )
}

export default View_Order