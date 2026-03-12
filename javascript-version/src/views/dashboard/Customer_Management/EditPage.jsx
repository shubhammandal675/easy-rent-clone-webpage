'use client'
import React, { useState, useEffect } from 'react'
import PhoneInput from '@dvij-infotech/react-phone-input-2-country-sort'
import '@dvij-infotech/react-phone-input-2-country-sort/lib/style.css'
import { Box, TextField, Button, Typography, Grid, Card, MenuItem, Select, FormControl, FormHelperText } from '@mui/material'

const EditPage = ({ data, onBack, onUpdate, onError }) => {
  const [formData, setFormData] = useState({
    firstName: data?.name?.split(' ')[0] || '',
    lastName: data?.name?.split(' ').slice(1).join(' ') || '',  // ← fix
    email: data?.email || '',
    countryCode: data?.contact?.split(' ')[0] || '+91',         // ← "+91"
    number: data?.contact?.split(' ').slice(1).join('') || '',  // ← "9876543210"
    currency: data?.currency || 'USD',
    language: data?.language || 'English'
  })

  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(data?.profileImage ? `http://localhost:5000${data.profileImage}` : null)

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.name?.split(' ')[0] || '',
        lastName: data.name?.split(' ').slice(1).join(' ') || '',  // ← fix
        email: data.email || '',
        countryCode: data.contact?.split(' ')[0] || '+91',         // ← "+91"
        number: data.contact?.split(' ').slice(1).join('') || '',  // ← "9876543210"
        currency: data.currency || 'USD',
        language: data.language || 'English'
      });
    }
  }, [data]);

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

  const handleChange = (field, value) => {
    const finalValue = field === "email" ? value.replace(/\s/g, "") : value;
    setFormData(prev => ({ ...prev, [field]: finalValue }))
    if (finalValue.trim() !== "") {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }

  // ← Fixed: same as AddPage
  const handlePhoneChange = (value, data) => {
    const dialCode = data.dialCode
    const phoneNumber = value.slice(dialCode.length)

    setFormData(prev => ({
      ...prev,
      countryCode: `+${dialCode}`,
      number: phoneNumber,
    }))

    if (phoneNumber.length >= 7) {
      setErrors(prev => ({ ...prev, number: '' }))
    }
  }

  const handleHover = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file)) 
      setErrors(prev => ({ ...prev, profileImage: "" }))
    }
  }

  const handleUpdateClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();

    const newErrors = {
      firstName: !formData.firstName.trim() ? "Required" : "",
      lastName: !formData.lastName.trim() ? "Required" : "",
      email: !trimmedEmail ? "Required" : (!emailRegex.test(trimmedEmail) ? "Invalid email format" : ""),
      number: (!formData.number || formData.number.length < 7) ? "Invalid phone number" : "",
      currency: !formData.currency ? "Required" : "",
      language: !formData.language ? "Required" : "",
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(val => val !== "")) {
      onError("Please fix the errors highlighted in red!", "error");
      return;
    }

    try {
      await onUpdate({
        ...formData,
        profileImage: imageFile, 
        id: data._id 
      });
    } catch (err) {
      const backendMessage = err.response?.data?.message || "An unexpected error occurred";
      onError(backendMessage, "error");

      const lowerMsg = backendMessage.toLowerCase();
      if (lowerMsg.includes("email")) {
        setErrors(prev => ({ ...prev, email: "Email already taken" }));
      }
      if (lowerMsg.includes("phone") || lowerMsg.includes("number") || lowerMsg.includes("contact")) {
        setErrors(prev => ({ ...prev, number: "Phone number already taken" }));
      }
    }
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee', overflow: 'visible' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>
            Update Customer
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleUpdateClick} sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600, px: 4, '&:hover': { backgroundColor: '#00b8bc' } }}>
              Update
            </Button>
            <Button variant="outlined" onClick={onBack} sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', fontWeight: 600, px: 4, '&:hover': { borderColor: '#00cfd5', backgroundColor: 'rgba(0, 207, 213, 0.05)' } }}>
              Back
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5, ml: 2 }}>
          <Box 
            onMouseEnter={() => handleHover('profileImage')}
            sx={{ width: 80, height: 80, backgroundColor: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4', overflow: 'hidden', border: errors.profileImage ? '2px solid #d32f2f' : '2px solid #f0f0f0' }}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <i className="ri-user-fill" style={{ fontSize: '60px' }} />
            )}
          </Box>
          <Button variant="contained" component="label" size="small" sx={{ mt: 2, backgroundColor: '#00cfd5', textTransform: 'none', width: '80px', borderRadius: '8px' }}>
            Upload 
            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          </Button>
        </Box>

        <Grid container spacing={4} sx={{ overflow: 'visible' }}>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>First Name</Typography>
            <TextField fullWidth value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} error={!!errors.firstName} helperText={errors.firstName} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Last Name</Typography>
            <TextField fullWidth value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} error={!!errors.lastName} helperText={errors.lastName} sx={InputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Email</Typography>
            <TextField fullWidth value={formData.email} onChange={(e) => handleChange('email', e.target.value)} error={!!errors.email} helperText={errors.email} sx={InputStyle} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
            <Typography sx={LabelStyle}>Contact Number</Typography>
            <Box sx={{ 
              '& .react-tel-input .form-control': { width: '100%', height: '50px', borderRadius: '8px', backgroundColor: '#fcfcfc', borderColor: !!errors.number ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)' },
              '& .react-tel-input .flag-dropdown': { borderRadius: '8px 0 0 8px', backgroundColor: 'transparent', borderColor: !!errors.number ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)' },
              '& .react-tel-input .country-list': { zIndex: 9999 }
            }}>
              <PhoneInput
                country={'in'}
                value={(formData.countryCode?.replace('+', '') + formData.number) || ''}  // ← fix
                onChange={handlePhoneChange}
                enableSearch={true}
                placeholder="Enter contact number"
                inputProps={{ autoComplete: 'off' }}
                dropdownStyle={{ position: 'fixed', zIndex: 9999 }}
              />
              {errors.number && (
                <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: '3px', ml: '14px' }}>
                  {errors.number}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Currency</Typography>
            <FormControl fullWidth error={!!errors.currency}>
              <Select value={formData.currency} onChange={(e) => handleChange('currency', e.target.value)} sx={{ borderRadius: '8px', height: '50px' }}>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="TRY">TRY</MenuItem>
              </Select>
              {errors.currency && <FormHelperText>{errors.currency}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={LabelStyle}>Language</Typography>
            <FormControl fullWidth error={!!errors.language}>
              <Select value={formData.language} onChange={(e) => handleChange('language', e.target.value)} sx={{ borderRadius: '8px', height: '50px' }}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="German">German</MenuItem>
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

export default EditPage