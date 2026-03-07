'use client'
import React from 'react'
import { 
  Grid, TextField, Typography, Box, Radio, 
  RadioGroup, FormControlLabel, Checkbox, Slider, FormHelperText 
} from '@mui/material'

const Step4DeliveryDetails = ({ mode = 'add', formData, setFormData, errors = {}, setErrors }) => {
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
    // Hover feature: hide error message
    '&:hover .MuiFormHelperText-root': {
      visibility: 'hidden', 
    },
    '& .MuiInputBase-input': { padding: '10px 14px' }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleChange = (e) => {
    if (!isView) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      if (setErrors && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  }

  const handleCheckboxChange = (day) => {
    if (isView) return;
    const currentDays = formData.deliveryDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    
    setFormData({ ...formData, deliveryDays: newDays });
    if (setErrors && errors.deliveryDays) {
        setErrors((prev) => ({ ...prev, deliveryDays: '' }));
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        {isView ? 'Delivery Details (View Only)' : 'Delivery Details'}
      </Typography>

      {/* 1. Do You Deliver? */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={LabelStyle}>Do You Deliver?</Typography>
        <RadioGroup 
          row 
          name="isDelivering" 
          value={formData?.isDelivering || 'no'} 
          onChange={handleChange}
        >
          <FormControlLabel 
            value="yes" 
            disabled={isView}
            control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#00cfd5' } }} />} 
            label={<Typography sx={{ fontSize: '0.85rem' }}>Yes</Typography>} 
          />
          <FormControlLabel 
            value="no" 
            disabled={isView}
            control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#00cfd5' } }} />} 
            label={<Typography sx={{ fontSize: '0.85rem' }}>No</Typography>} 
          />
        </RadioGroup>
      </Box>

      {/* 2. Days Checkboxes */}
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: '#333' }}>Delivery Availability</Typography>
      <Typography sx={LabelStyle}>Days</Typography>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {days.map((day) => (
          <Grid item xs={12} sm={4} md={3} key={day}>
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  disabled={isView}
                  checked={(formData.deliveryDays || []).includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                  sx={{ '&.Mui-checked': { color: '#00cfd5' } }} 
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>{day}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
      {errors.deliveryDays && <FormHelperText error sx={{ mb: 3 }}>{errors.deliveryDays}</FormHelperText>}


      {/* 3. Time Slots */}
      <Grid container spacing={2.5} sx={{ mb: 3, mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Start Time</Typography>
          <TextField 
            fullWidth type="time" name="startTime" disabled={isView}
            value={formData?.startTime || ''} onChange={handleChange}
            error={!!errors.startTime} helperText={errors.startTime}
            sx={InputStyle} InputLabelProps={{ shrink: true }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>End Time</Typography>
          <TextField 
            fullWidth type="time" name="endTime" disabled={isView}
            value={formData?.endTime || ''} onChange={handleChange}
            error={!!errors.endTime} helperText={errors.endTime}
            sx={InputStyle} InputLabelProps={{ shrink: true }} 
          />
        </Grid>
      </Grid>

      {/* 4. Radius Slider */}
      <Box sx={{ mb: 4, maxWidth: '400px' }}>
        <Typography sx={LabelStyle}>
          Delivery Radius <span style={{ fontWeight: 400, color: '#888' }}>(Within {formData?.radius || 0} miles from my location)</span>
        </Typography>
        <Slider
          name="radius"
          disabled={isView}
          value={formData?.radius || 0}
          onChange={(e, val) => setFormData({...formData, radius: val})}
          sx={{
            color: '#00cfd5',
            height: 4,
            '& .MuiSlider-thumb': { width: 12, height: 12, backgroundColor: '#00cfd5' }
          }}
        />
      </Box>

      {/* 5. Lead Time */}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography sx={LabelStyle}>Lead Time</Typography>
          <TextField 
            fullWidth name="leadTime" disabled={isView}
            value={formData?.leadTime || ''} onChange={handleChange}
            error={!!errors.leadTime} helperText={errors.leadTime}
            placeholder="Enter Lead Time (e.g. 2 hours)" sx={InputStyle} 
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step4DeliveryDetails