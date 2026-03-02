'use client'
import React from 'react'
import { Grid, TextField, Typography, MenuItem, Select, FormControl, InputAdornment, Box } from '@mui/material'

const Step1PersonalInfo = () => {
  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 1, display: 'block' }
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#00cfd5' },
    } 
  }

  return (
    <Box >
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 4, color: '#333' }}>
        Enter Personal Information
      </Typography>

      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>First Name</Typography>
          <TextField fullWidth
          size="small"
          placeholder="Enter first name" sx={InputStyle} />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Last Name</Typography>
          <TextField fullWidth 
          size="small"
          placeholder="Enter last name" sx={InputStyle} />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Email</Typography>
          <TextField fullWidth 
          size="small"
          placeholder="Enter Email" sx={InputStyle} />
        </Grid>

        {/* Contact Number with Flag icon placeholder */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Contact Number</Typography>
          <TextField 
            fullWidth 
            size="small"
            placeholder="+91 00000-00000" 
            sx={InputStyle}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            //         <img src="https://flagcdn.com/w20/in.png" alt="India" style={{ width: 18 }} />
            //         <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>+91</Typography>
            //       </Box>
            //     </InputAdornment>
            //   ),
            // }}
          />
        </Grid>

        {/* Currency Dropdown */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Currency</Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            defaultValue=""
            sx={{ borderRadius: '8px', color: '#888' }}
          >
            <MenuItem value="" disabled>Select Currency</MenuItem>
            <MenuItem value="USD">USD - US Dollar</MenuItem>
            <MenuItem value="INR">INR - Indian Rupee</MenuItem>
            <MenuItem value="AED">AED - Dirham</MenuItem>
          </Select>
        </Grid>

        {/* Language Dropdown */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Language</Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            defaultValue=""
            sx={{ borderRadius: '8px', color: '#888' }}
          >
            <MenuItem value="" disabled>Select Language</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Arabic">Arabic</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step1PersonalInfo