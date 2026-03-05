'use client'
import React from 'react'
import { Grid, TextField, Typography, Box, Button } from '@mui/material'

const Step2IdentityDetails = ({ mode = 'add', formData, setFormData }) => {
  const isView = mode === 'view';

  const LabelStyle = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333',
    mb: 1,
    display: 'block'
  }

  const InputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '45px',
      backgroundColor: isView ? '#f9f9f9' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: isView ? '#e0e0e0' : '#00cfd5' },
    }
  }

  // Exact Match style for Document Upload Boxes in Image
  const UploadBoxStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    cursor: isView ? 'default' : 'pointer',
    transition: '0.3s',
    '&:hover': {
      borderColor: isView ? '#e0e0e0' : '#00cfd5'
    }
  }

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 4, color: '#333' }}>
        Enter Your Details
      </Typography>

      {/* Profile Image Section - Exactly as per Image */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 5 }}>
        <Box sx={{
          width: 90,
          height: 90,
          backgroundColor: '#222', // Dark background for avatar placeholder
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid #ddd'
        }}>
          {formData?.profileImage ? (
            <img src={formData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <i className="ri-user-fill" style={{ fontSize: '50px', color: '#fff' }} />
          )}
        </Box>

        {!isView && (
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              mt: 1.5,
              backgroundColor: '#00cfd5',
              textTransform: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              px: 2,
              '&:hover': { backgroundColor: '#00b8bc' }
            }}
          >
            Upload
            <input hidden accept="image/*" type="file" />
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {/* Date of Registration */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Date of Registration / Incorporation</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            name="regDate"
            disabled={isView}
            value={formData?.regDate || ''}
            onChange={handleChange}
            sx={InputStyle}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Business Type */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Business Type</Typography>
          <TextField
            fullWidth
            size="small"
            name="businessType"
            disabled={isView}
            value={formData?.businessType || ''}
            onChange={handleChange}
            placeholder="Enter business type"
            sx={InputStyle}
          />
        </Grid>

        {/* Residency Proof - Large Box with Icon */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Upload your residency proof</Typography>
          <Box sx={UploadBoxStyle} component="label">
             {!isView && <input hidden type="file" />}
             <i className="ri-file-text-line" style={{ fontSize: '40px', color: '#4285f4' }} />
             <Typography sx={{ fontSize: '0.75rem', color: '#888', mt: 1 }}>Click to upload</Typography>
          </Box>
        </Grid>

        {/* Driving License - Large Box with Icon */}
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Upload your driving license</Typography>
          <Box sx={UploadBoxStyle} component="label">
             {!isView && <input hidden type="file" />}
             <i className="ri-file-text-line" style={{ fontSize: '40px', color: '#4285f4' }} />
             <Typography sx={{ fontSize: '0.75rem', color: '#888', mt: 1 }}>Click to upload</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step2IdentityDetails