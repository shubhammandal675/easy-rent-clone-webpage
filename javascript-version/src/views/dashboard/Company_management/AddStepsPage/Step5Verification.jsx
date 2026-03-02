'use client'
import React, { useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'

const Step5 = () => {
  const [files, setFiles] = useState({ vat: null, tax: null })

  const UploadBox = ({ title, type }) => (
    <Box>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 1.5 }}>{title}</Typography>
      <Box
        sx={{
          border: '2px dashed #00cfd5',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f0fbff',
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': { backgroundColor: '#e0f7f9', borderColor: '#00b8bc' }
        }}
        onClick={() => document.getElementById(type).click()}
      >
        <input 
          type="file" 
          id={type} 
          hidden 
          onChange={(e) => setFiles({ ...files, [type]: e.target.files[0] })} 
        />
        <i className="ri-upload-cloud-2-line" style={{ fontSize: '40px', color: '#00cfd5' }} />
        <Typography sx={{ mt: 1, fontWeight: 500, fontSize: '0.9rem' }}>
          {files[type] ? files[type].name : 'Click to upload or drag and drop'}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          PDF, PNG, JPG, or GIF (max. 10MB)
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3 }}>Business Verification</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <UploadBox title="VAT Certificate" type="vat" />
        </Grid>
        <Grid item xs={12} md={6}>
          <UploadBox title="Tax Registration Certificate" type="tax" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step5