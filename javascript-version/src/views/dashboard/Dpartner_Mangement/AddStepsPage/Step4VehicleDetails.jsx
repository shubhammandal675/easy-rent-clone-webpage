'use client'
import React from 'react'
import { 
  Grid, TextField, Typography, Box, Radio, 
  RadioGroup, FormControlLabel, Checkbox, Slider 
} from '@mui/material'

const Step4DeliveryDetails = () => {
  // Label ki styling - sab jagah same dikhega
  const LabelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#333', mb: 0.8, display: 'block' }
  
  // Input box ki styling - Height 42px aur Border radius 8px
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '8px',
      fontSize: '0.85rem',
      height: '42px',
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#00cfd5' },
      '&.Mui-focused fieldset': { borderColor: '#00cfd5' },
    },
    '& .MuiInputBase-input': { padding: '10px 14px' }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 3, color: '#333' }}>
        Delivery Details
      </Typography>

      {/* 1. Radio Buttons: Delivery status */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={LabelStyle}>Do You Deliver?</Typography>
        <RadioGroup row defaultValue="no">
          <FormControlLabel 
            value="yes" 
            control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#00cfd5' } }} />} 
            label={<Typography sx={{ fontSize: '0.85rem' }}>Yes</Typography>} 
          />
          <FormControlLabel 
            value="no" 
            control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#00cfd5' } }} />} 
            label={<Typography sx={{ fontSize: '0.85rem' }}>No</Typography>} 
          />
        </RadioGroup>
      </Box>

      {/* 2. Days Checkboxes: Kab-kab delivery hogi */}
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 1, color: '#333' }}>Delivery Availability</Typography>
      <Typography sx={LabelStyle}>Days</Typography>
      <Grid container spacing={1} sx={{ mb: 4 }}>
        {days.map((day) => (
          <Grid item xs={12} sm={4} md={3} key={day}>
            <FormControlLabel
              control={<Checkbox size="small" sx={{ '&.Mui-checked': { color: '#00cfd5' } }} />}
              label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>{day}</Typography>}
            />
          </Grid>
        ))}
      </Grid>


      {/* 3. Time Slots: Kaam ka samay */}
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 2, color: '#333' }}>Delivery Availability</Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>Start Time</Typography>
          <TextField fullWidth type="time" sx={InputStyle} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={LabelStyle}>End Time</Typography>
          <TextField fullWidth type="time" sx={InputStyle} InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>

      {/* 4. Radius Slider: Kitni door tak? */}
      <Box sx={{ mb: 4, maxWidth: '400px' }}>
        <Typography sx={LabelStyle}>
          Delivery Radius <span style={{ fontWeight: 400, color: '#888' }}>(Within 0 miles from my location)</span>
        </Typography>
        <Slider
          defaultValue={0}
          sx={{
            color: '#00cfd5',
            height: 4,
            '& .MuiSlider-thumb': { width: 12, height: 12, backgroundColor: '#00cfd5' }
          }}
        />
      </Box>


      {/* 5. Lead Time: Kitne time pehle batana hoga */}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography sx={LabelStyle}>Lead Time</Typography>
          <TextField fullWidth placeholder="Enter Lead Time" sx={InputStyle} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step4DeliveryDetails