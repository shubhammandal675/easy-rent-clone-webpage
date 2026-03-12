'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select, FormHelperText, FormControl } from '@mui/material'
import PhoneInput from '@dvij-infotech/react-phone-input-2-country-sort'
import '@dvij-infotech/react-phone-input-2-country-sort/lib/style.css'

const AddPage = ({ onBack, onAdd, onError }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    number: '',
    fullNumber: '',
    currency: '',
    language: ''
  })

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
    const { name, value } = e.target
    const finalValue = name === 'email' ? value.replace(/\s/g, '') : value

    setFormData(prev => ({ ...prev, [name]: finalValue }))

    if (finalValue.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

const handlePhoneChange = (value, data) => {
  const dialCode = data.dialCode
  const phoneNumber = value.slice(dialCode.length)
  console.log("phone number", phoneNumber)

  setFormData(prev => ({
    ...prev,
    countryCode: `+${dialCode}`,  // "+91"
    number: phoneNumber,           // "9876543210"
    fullNumber: `+${dialCode} ${phoneNumber}`    // "919876543210" (no + prefix)
  }))
console.log("form",formData)
  if (phoneNumber.length >= 7) {
    setErrors(prev => ({ ...prev, number: '' }))
  }
}

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setErrors(prev => ({ ...prev, profileImage: '' }))
    }
  }

  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const trimmedEmail = formData.email.trim()

    const newErrors = {
      firstName: !formData.firstName.trim() ? 'Required' : '',
      lastName: !formData.lastName.trim() ? 'Required' : '',
      email: !trimmedEmail ? 'Required' : (!emailRegex.test(trimmedEmail) ? 'Invalid format' : ''),
      number: (!formData.fullNumber || formData.fullNumber.length < 10) ? 'Invalid phone number' : '',
      currency: !formData.currency ? 'Required' : '',
      language: !formData.language ? 'Required' : '',
      profileImage: !imageFile ? 'Required' : ''
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(val => val !== '')) {
      onError('Please fix the errors highlighted in red!', 'error')
      return
    }

    try {
      await onAdd({ ...formData, profileImage: imageFile })
    } catch (err) {
      const backendMsg = err.response?.data?.message || 'An unexpected error occurred'
      onError(backendMsg, 'error')

      const lowerMsg = backendMsg.toLowerCase()

      if (lowerMsg.includes('email')) {
        setErrors(prev => ({ ...prev, email: 'Email already exists' }))
      } else if (lowerMsg.includes('number') || lowerMsg.includes('phone') || lowerMsg.includes('contact')) {
        setErrors(prev => ({ ...prev, number: 'Phone number already exists' }))
      }
    }
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 7, borderRadius: '15px', overflow: 'visible' }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 8 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Add Customer</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#00cfd5', '&:hover': { backgroundColor: '#00b4b9' }, textTransform: 'none', fontWeight: 600 }}>
              Add Customer
            </Button>
            <Button variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none' }} onClick={onBack}>Back</Button>
          </Box>
        </Box>

        {/* Profile Image Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
          <Box
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
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField fullWidth name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" error={!!errors.firstName} helperText={errors.firstName} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField fullWidth name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" error={!!errors.lastName} helperText={errors.lastName} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Email Address</Typography>
            <TextField fullWidth name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" error={!!errors.email} helperText={errors.email} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', height: '45px' } }} />
          </Grid>

          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <Box sx={{
              position: 'relative',
              '& .react-tel-input .form-control': {
                width: '100%', height: '45px', borderRadius: '8px',
                borderColor: !!errors.number ? '#d32f2f !important' : 'rgba(0, 0, 0, 0.23)'
              },
              '& .react-tel-input .flag-dropdown': {
                borderRadius: '8px 0 0 8px', height: '45px',
                borderColor: !!errors.number ? '#d32f2f !important' : 'rgba(0, 0, 0, 0.23)',
                backgroundColor: 'transparent'
              }
            }}>
              <PhoneInput
                country={'in'}
                placeholder="Enter phone number"
                value={formData.fullNumber?.replace('+', '') || ''}
                onChange={handlePhoneChange}
                enableSearch={true}
                dropdownStyle={{ zIndex: 2000 }}
              />
              {errors.number && <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: 0.5, ml: 2 }}>{errors.number}</Typography>}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <FormControl fullWidth error={!!errors.currency}>
              <Select name="currency" value={formData.currency} onChange={handleChange} displayEmpty sx={{ borderRadius: '8px', height: '45px' }}>
                <MenuItem value="" disabled>Select Currency</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="TRY">TRY</MenuItem>
              </Select>
              {errors.currency && <FormHelperText>{errors.currency}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <FormControl fullWidth error={!!errors.language}>
              <Select name="language" value={formData.language} onChange={handleChange} displayEmpty sx={{ borderRadius: '8px', height: '45px' }}>
                <MenuItem value="" disabled>Select Language</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Turkish">Turkish</MenuItem>
              </Select>
              {errors.language && <FormHelperText>{errors.language}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default AddPage