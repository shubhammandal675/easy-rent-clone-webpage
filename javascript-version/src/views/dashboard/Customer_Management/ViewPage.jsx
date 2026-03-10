'use client'
import React from 'react'
import { 
  Box, TextField, Button, Typography, Grid, 
  Card, MenuItem, Select 
} from '@mui/material'

const ViewPage = ({ data, onBack }) => {
  
  const LabelStyle = {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#666',
    mb: 1,
    display: 'block'
  }

  const InputStyle = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px', 
      height: '50px',
      backgroundColor: '#f9f9f9',
      // This makes the mouse pointer show a "disabled/prohibited" circle
      cursor: 'not-allowed', 
    },
    '& .MuiOutlinedInput-input': {
      cursor: 'not-allowed', // Ensures the inner text area also shows the icon
    },
    '& .Mui-disabled': {
      WebkitTextFillColor: '#444 !important', 
    },
    '& fieldset': { border: '1px solid #e0e0e0 !important' }
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#000' }}>
            View Customer
          </Typography>
          <Button 
            variant="outlined" 
            onClick={onBack}
            sx={{ 
              color: '#00cfd5', 
              borderColor: '#00cfd5', 
              textTransform: 'none', 
              fontWeight: 600, 
              px: 4,
              borderRadius: '8px',
              '&:hover': { borderColor: '#00cfd5', backgroundColor: 'rgba(0, 207, 213, 0.05)' }
            }}
          >
            Back
          </Button>
        </Box>

        {/* IMAGE SECTION - Showing Real Image */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
          <Box sx={{ 
            width: 100, 
            height: 100, 
            backgroundColor: '#eef2ff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            border: '2px solid #f0f0f0'
          }}>
            {data?.profileImage ? (
              <img 
                src={`http://localhost:5000${data.profileImage}`} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <i className="ri-user-fill" style={{ fontSize: '80px', color: '#54a5d4' }} />
            )}
          </Box>
        </Box>

        {/* Form Fields Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.name?.split(' ')[0] || ''}
              sx={InputStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.name?.split(' ')[1] || ''}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Email</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.email || ''}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.contact || data?.number || ''}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <Select 
              fullWidth 
              disabled
              value={data?.currency || 'USD'}
              sx={{ 
                borderRadius: '8px', 
                height: '50px', 
                backgroundColor: '#f9f9f9',
                cursor: 'not-allowed', // Fix for Select pointer
                '& .MuiSelect-select': { cursor: 'not-allowed' } 
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="TRY">TRY</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <Select 
              fullWidth 
              disabled
              value={data?.language || 'English'}
              sx={{ 
                borderRadius: '8px', 
                height: '50px', 
                backgroundColor: '#f9f9f9',
                cursor: 'not-allowed',
                '& .MuiSelect-select': { cursor: 'not-allowed' }
              }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="Turkish">Turkish</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ViewPage