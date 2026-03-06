'use client'
import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, TextField, Button, Grid } from '@mui/material'

const View_Delivery = ({ order, onBack, orders }) => {
  const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
  const [displayData, setDisplayData] = useState(null);

  // Agar 'order' prop khali hai, toh list mein se dhoondo (for URL/ID match)
  useEffect(() => {
    if (order) {
      setDisplayData(order);
    } else if (orders) {
      setDisplayData(orders[0]); 
    }
  }, [order, orders]);

  const labelStyle = { fontSize: '0.85rem', fontWeight: 500, color: '#8e98a8', mb: 1, fontFamily: outfitFont };
  const fieldStyle = {
    '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#fff' },
    '& .MuiInputBase-input': { fontFamily: outfitFont, fontSize: '0.9rem', color: '#666' }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6 }}>
      <Card sx={{ borderRadius: "15px", p: 6, border: '1px solid #eef0f2' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: outfitFont }}>View Orders</Typography>
          <Button variant="outlined" onClick={onBack} sx={{ textTransform: 'none', borderRadius: '8px', color: '#00cfd5', borderColor: '#00cfd5' }}>Back</Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Order ID</Typography>
            <TextField fullWidth size="small" value={displayData?.id || '-'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Product Name</Typography>
            <TextField fullWidth size="small" value={displayData?.product || '-'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Quantity</Typography>
            <TextField fullWidth size="small" value={displayData?.quantity || '-'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Price</Typography>
            <TextField fullWidth size="small" value={displayData?.price || '€ undefined'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Delivery Type</Typography>
            <TextField fullWidth size="small" value={displayData?.deliveryType || '-'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={labelStyle}>Status</Typography>
            <TextField fullWidth size="small" value={displayData?.status || '-'} InputProps={{ readOnly: true }} sx={fieldStyle} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default View_Delivery