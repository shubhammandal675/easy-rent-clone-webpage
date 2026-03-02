'use client'
import React from 'react'
import { 
  Box, TextField, Button, Typography, Grid, 
  Card, MenuItem, Select, InputAdornment 
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
      backgroundColor: '#fcfcfc',
    },
    '& .Mui-disabled': {
      WebkitTextFillColor: '#444 !important', // Text color when disabled
      backgroundColor: '#f9f9f9'
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


        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
          <Box sx={{ 
            width: 100, 
            height: 100, 
            backgroundColor: '#4a90e2', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
          }}>
            {/* White User Icon */}
            <i className="ri-user-fill" style={{ fontSize: '80px', color: '#fff' }} />
          </Box>
        </Box>

        {/* Form Fields Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.name?.split(' ')[0] || 'Shubham'}
              sx={InputStyle}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.name?.split(' ')[1] || 'Mandal'}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Email</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.email || 'example@gmail.com'}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField 
              fullWidth 
              disabled
              value={data?.number || '+91 255104052'}
            //   InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         {/* Flag placeholder  */}
            //         <Box component="span" sx={{ fontSize: '20px', mr: 1 }}>🇦🇴</Box>
            //         <Box sx={{ borderRight: '1px solid #ddd', height: '20px', mr: 1 }} />
            //       </InputAdornment>
            //     ),
            //   }}
              sx={InputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <Select 
              fullWidth 
              disabled
              value="EUR"
              sx={{ borderRadius: '8px', height: '50px', backgroundColor: '#f9f9f9' }}
            >
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <Select 
              fullWidth 
              disabled
              value="English"
              sx={{ borderRadius: '8px', height: '50px', backgroundColor: '#f9f9f9' }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="German">German</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ViewPage