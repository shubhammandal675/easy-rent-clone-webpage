'use client'
import React from 'react'
import { 
  Grid, TextField, Typography, Box, Radio, 
  RadioGroup, FormControlLabel, Checkbox, Slider 
} from '@mui/material'

const Step5Reviews = ({ formData, setFormData, mode = 'add' }) => {
  const isView = mode === 'view';
  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 0.8, display: 'block' }
  
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px', fontSize: '0.85rem', height: '42px',
      backgroundColor: isView ? '#f9f9f9' : '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&.Mui-focused fieldset': { borderColor: '#00cfd5' },
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleDayChange = (day) => {
    const currentDays = formData.deliveryDays || [];
    const newDays = currentDays.includes(day) 
      ? currentDays.filter(d => d !== day) 
      : [...currentDays, day];
    setFormData({ ...formData, deliveryDays: newDays });
  }

  return (
    <Box sx={{ minHeight: '400px' }}>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        Delivery Details
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={LabelStyle}>Do You Deliver?</Typography>
        <RadioGroup 
          row 
          name="isDelivering"
          value={formData?.isDelivering || 'no'}
          onChange={(e) => setFormData({...formData, isDelivering: e.target.value})}
        >
          <FormControlLabel value="yes" control={<Radio size="small" sx={{ color: '#00cfd5' }} />} label="Yes" />
          <FormControlLabel value="no" control={<Radio size="small" sx={{ color: '#00cfd5' }} />} label="No" />
        </RadioGroup>
      </Box>

      <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: '#333' }}>Delivery Availability</Typography>
      <Grid container spacing={1} sx={{ mb: 4 }}>
        {days.map((day) => (
          <Grid item xs={6} sm={4} md={3} key={day}>
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  checked={formData?.deliveryDays?.includes(day) || false}
                  onChange={() => handleDayChange(day)}
                  sx={{ color: '#00cfd5' }} 
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem' }}>{day}</Typography>}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography sx={LabelStyle}>Start Time</Typography>
          <TextField 
            fullWidth type="time" sx={InputStyle} 
            value={formData?.startTime || ''}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            InputLabelProps={{ shrink: true }} 
          />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={LabelStyle}>End Time</Typography>
          <TextField 
            fullWidth type="time" sx={InputStyle} 
            value={formData?.endTime || ''}
            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            InputLabelProps={{ shrink: true }} 
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4, maxWidth: '400px' }}>
        <Typography sx={LabelStyle}>Delivery Radius ({formData?.radius || 0} miles)</Typography>
        <Slider
          value={formData?.radius || 0}
          onChange={(e, val) => setFormData({...formData, radius: val})}
          sx={{ color: '#00cfd5' }}
        />
      </Box>
    </Box>
  )
}

export default Step5Reviews;