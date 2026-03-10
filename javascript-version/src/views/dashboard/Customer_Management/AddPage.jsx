'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select, FormHelperText, FormControl } from '@mui/material'

const AddPage = ({ onBack, onAdd, onError }) => {
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    number: '', 
    currency: 'USD', 
    language: 'English'
  })
  
  // Track errors for all fields
  const [errors, setErrors] = useState({})

  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const LabelStyle = {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#666',
    mb: 1,
    display: 'block'
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Hide error when user starts writing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: false }))
    }
  }

  // Hide error on Mouse Hover
  const handleHover = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: false }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file)) 
      setErrors(prev => ({ ...prev, profileImage: false }))
    }
  }

  const handleSave = () => {
    // Validate ALL columns
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      number: !formData.number,
      currency: !formData.currency,
      language: !formData.language,
      profileImage: !imageFile
    }

    setErrors(newErrors)

    const hasError = Object.values(newErrors).some(val => val === true)

    if (hasError) {
      onError("Please fill all fields!", "error");
      return;
    }

    onAdd({ ...formData, profileImage: imageFile });
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 7, borderRadius: '15px' }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 8 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Add Customer</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>
              Add Customer
            </Button>
            <Button variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none' }} onClick={onBack}>Back</Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
          <Box 
            onMouseEnter={() => handleHover('profileImage')}
            sx={{
              width: 80, height: 80, backgroundColor: '#eef2ff', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#54a5d4', overflow: 'hidden', 
              border: errors.profileImage ? '2px solid #d32f2f' : '2px solid #f0f0f0'
            }}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="ri-user-fill" style={{ fontSize: '60px' }} />
            )}
          </Box>
          <Button variant="contained" component="label" size="small" sx={{ mt: 2, backgroundColor: '#00cfd5', textTransform: 'none', width: '80px', borderRadius: '8px' }}>
            Upload <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          </Button>
          {errors.profileImage && <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: 1 }}>Required</Typography>}
        </Box>

        <Grid container spacing={3}>
          {/* First Name */}
          <Grid item xs={6} onMouseEnter={() => handleHover('firstName')}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField fullWidth name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" error={errors.firstName} helperText={errors.firstName && "Required"} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          {/* Last Name */}
          <Grid item xs={6} onMouseEnter={() => handleHover('lastName')}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField fullWidth name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" error={errors.lastName} helperText={errors.lastName && "Required"} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          {/* Email */}
          <Grid item xs={6} onMouseEnter={() => handleHover('email')}>
            <Typography sx={LabelStyle}>Email Address</Typography>
            <TextField fullWidth name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" error={errors.email} helperText={errors.email && "Required"} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          {/* Contact */}
          <Grid item xs={6} onMouseEnter={() => handleHover('number')}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField fullWidth name="number" value={formData.number} onChange={handleChange} placeholder="Enter contact number" error={errors.number} helperText={errors.number && "Required"} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          {/* Currency */}
          <Grid item xs={6} onMouseEnter={() => handleHover('currency')}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <FormControl fullWidth error={errors.currency}>
              <Select name="currency" value={formData.currency} onChange={handleChange} sx={{ borderRadius: '8px', height: '45px' }}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="TRY">TRY</MenuItem>
              </Select>
              {errors.currency && <FormHelperText>Required</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Language */}
          <Grid item xs={6} onMouseEnter={() => handleHover('language')}>
            <Typography sx={LabelStyle}>Language</Typography>
            <FormControl fullWidth error={errors.language}>
              <Select name="language" value={formData.language} onChange={handleChange} sx={{ borderRadius: '8px', height: '45px' }}>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Turkish">Turkish</MenuItem>
              </Select>
              {errors.language && <FormHelperText>Required</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default AddPage