'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select, FormControl, FormHelperText } from '@mui/material'

const EditPage = ({ data, onBack, onUpdate, onError }) => {
  // 1. Initialize local form state
  const [formData, setFormData] = useState({
    firstName: data?.name?.split(' ')[0] || '',
    lastName: data?.name?.split(' ')[1] || '',
    email: data?.email || '',
    number: data?.contact || '', 
    currency: data?.currency || 'USD',
    language: data?.language || 'English'
  })

  // Track errors for all fields (Red box logic)
  const [errors, setErrors] = useState({})

  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(data?.profileImage ? `http://localhost:5000${data.profileImage}` : null)

  // Styles
  const LabelStyle = {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#888',
    mb: 1,
    display: 'block'
  }

  const InputStyle = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px', 
      height: '50px',
      backgroundColor: '#fcfcfc',
    },
  }

  // Hide error when user starts writing
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }))
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

  // 4. Validate and send update
  const handleUpdateClick = () => {
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      number: !formData.number,
      currency: !formData.currency,
      language: !formData.language,
    }

    setErrors(newErrors)
    const hasError = Object.values(newErrors).some(val => val === true)

    if (hasError) {
      onError("Please fill all fields in red!", "error");
      return;
    }

    onUpdate({
      ...formData,
      profileImage: imageFile, 
      id: data._id 
    });
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>
            Update Customer
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleUpdateClick} 
              sx={{ 
                backgroundColor: '#00cfd5', 
                textTransform: 'none', 
                fontWeight: 600, 
                px: 4,
                '&:hover': { backgroundColor: '#00b8bc' }
              }}
            >
              Update
            </Button>
            <Button 
              variant="outlined" 
              onClick={onBack}
              sx={{ 
                color: '#00cfd5', 
                borderColor: '#00cfd5', 
                textTransform: 'none', 
                fontWeight: 600, 
                px: 4,
                '&:hover': { borderColor: '#00cfd5', backgroundColor: 'rgba(0, 207, 213, 0.05)' }
              }}
            >
              Back
            </Button>
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
              <img src={previewUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="ri-user-fill" style={{ fontSize: '60px' }} />
            )}
          </Box>
          <Button 
            variant="contained" 
            component="label" 
            size="small" 
            sx={{ mt: 2, backgroundColor: '#00cfd5', textTransform: 'none', width: '80px', borderRadius: '8px' }}
          >
            Upload 
            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          </Button>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('firstName')}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField fullWidth value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} error={errors.firstName} helperText={errors.firstName && "Required"} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('lastName')}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField fullWidth value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} error={errors.lastName} helperText={errors.lastName && "Required"} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('email')}>
            <Typography sx={LabelStyle}>Email</Typography>
            <TextField fullWidth value={formData.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} helperText={errors.email && "Required"} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('number')}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <TextField fullWidth value={formData.number} onChange={(e) => handleChange('number', e.target.value)} error={errors.number} helperText={errors.number && "Required"} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('currency')}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <FormControl fullWidth error={errors.currency}>
              <Select value={formData.currency} onChange={(e) => handleChange('currency', e.target.value)} sx={{ borderRadius: '8px', height: '50px' }}>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="TRY">TRY</MenuItem>
              </Select>
              {errors.currency && <FormHelperText>Required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} onMouseEnter={() => handleHover('language')}>
            <Typography sx={LabelStyle}>Language</Typography>
            <FormControl fullWidth error={errors.language}>
              <Select value={formData.language} onChange={(e) => handleChange('language', e.target.value)} sx={{ borderRadius: '8px', height: '50px' }}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="German">German</MenuItem>
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

export default EditPage