'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, Paper, FormHelperText } from '@mui/material'

const Step5BusinessVerification = ({ mode = 'add', formData, setFormData, errors = {}, setErrors }) => {
  const isView = mode === 'view';

  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 0.8, display: 'block' }
  
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '42px',
      backgroundColor: isView ? '#f5f5f5' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    },
    '&:hover .MuiFormHelperText-root': { visibility: 'hidden' },
    '& .MuiInputBase-input': { padding: '10px 14px' }
  }

  const handleChange = (e) => {
    if (!isView) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (setErrors && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  }

  // File selection logic
  const handleFileChange = (name) => (e) => {
    if (isView) return;
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [name]: file.name }); // Abhi ke liye sirf naam store kar rahe hain
      if (setErrors && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  }

  const UploadBox = ({ title, name }) => (
    <Box sx={{ width: '100%' }}>
      <Typography sx={LabelStyle}>{title}</Typography>
      <input
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        id={`upload-${name}`}
        type="file"
        disabled={isView}
        onChange={handleFileChange(name)}
      />
      <label htmlFor={`upload-${name}`}>
        <Paper
          variant="outlined"
          sx={{
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: isView ? '#f9f9f9' : (errors[name] ? '#fff5f5' : '#f9f9f9'),
            border: errors[name] ? '1px dashed #d32f2f' : '1px dashed #e0e0e0',
            cursor: isView ? 'default' : 'pointer',
            '&:hover': { backgroundColor: isView ? '#f9f9f9' : '#f0fbff', borderColor: '#00cfd5' }
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
              alt="file icon" 
              style={{ width: '30px', opacity: formData[name] ? 1 : 0.5 }} 
            />
            <Typography sx={{ fontSize: '0.75rem', mt: 1, color: formData[name] ? '#00cfd5' : '#888' }}>
              {formData[name] || 'Click to Upload'}
            </Typography>
          </Box>
        </Paper>
      </label>
      {errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
    </Box>
  )

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UploadBox title="Upload Registration Certificate" name="regCertificate" />
        </Grid>
        <Grid item xs={12} md={6}>
          <UploadBox title="Upload Tax Certificate" name="taxCertificate" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Issuing Country / Authority</Typography>
          <TextField 
            fullWidth name="issuingAuthority" disabled={isView}
            value={formData?.issuingAuthority || ''} onChange={handleChange}
            error={!!errors.issuingAuthority} helperText={errors.issuingAuthority}
            placeholder="Enter Issuing Country / Authority" sx={InputStyle} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Tax Identification Number (VAT / GST / EIN)</Typography>
          <TextField 
            fullWidth name="taxIdNumber" disabled={isView}
            value={formData?.taxIdNumber || ''} onChange={handleChange}
            error={!!errors.taxIdNumber} helperText={errors.taxIdNumber}
            placeholder="Enter Tax Identification Number" sx={InputStyle} 
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={LabelStyle}>Trade / Operating License (Optional)</Typography>
          <TextField 
            fullWidth name="tradeLicense" disabled={isView}
            value={formData?.tradeLicense || ''} onChange={handleChange}
            placeholder="Enter Trade / Operating License" sx={InputStyle} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step5BusinessVerification