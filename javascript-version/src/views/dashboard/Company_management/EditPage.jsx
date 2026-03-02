'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Grid, Card, TextField, Avatar, Stack } from '@mui/material'

const EditPage = ({ data, onBack }) => {
  // Initial state from the selected row
  const [formData, setFormData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    number: data?.number || '',
    businessType: 'Rental' // Default or from data
  })

  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 1, display: 'block' }
  const InputStyle = { '& .MuiOutlinedInput-root': { borderRadius: '8px' } }

  const handleSave = () => {
    console.log("Updated Data:", formData)
    alert("Changes saved successfully!")
    onBack() // Go back to list
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>Edit Company Information</Typography>
          <Button variant="outlined" onClick={onBack} sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none' }}>
            Cancel
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#00cfd5', fontSize: '1.5rem' }}>
            {formData.name[0]}
          </Avatar>
          <Button variant="contained" size="small" sx={{ backgroundColor: '#00cfd5', textTransform: 'none' }}>
            Change Logo
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={LabelStyle}>Company Name</Typography>
            <TextField 
              fullWidth 
              value={formData.name} 
              sx={InputStyle}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={LabelStyle}>Business Type</Typography>
            <TextField 
              fullWidth 
              value={formData.businessType} 
              sx={InputStyle}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={LabelStyle}>Email Address</Typography>
            <TextField 
              fullWidth 
              value={formData.email} 
              sx={InputStyle}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField 
              fullWidth 
              value={formData.number} 
              sx={InputStyle}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 6 }}>
          <Button 
            variant="contained" 
            onClick={handleSave}
            sx={{ backgroundColor: '#00cfd5', px: 8, py: 1.2, borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
          >
            Save Changes
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default EditPage