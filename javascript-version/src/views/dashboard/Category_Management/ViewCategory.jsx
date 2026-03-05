'use client'
import React from 'react'
import { 
  Dialog, DialogTitle, DialogContent, Box, TextField, 
  Button, Typography, IconButton, Grid, Avatar, DialogActions
} from '@mui/material'

const ViewCategory = ({ data, onBack }) => {
  
  const SectionBox = {
    border: '1px solid #e0e4ec',
    borderRadius: '10px',
    p: 2,
    mb: 2,
    position: 'relative',
    backgroundColor: '#f9f9f9' // Light grey to show read-only mode
  }

  const LabelStyle = { fontSize: '0.75rem', fontWeight: 600, color: '#666', mb: 0.5 }
  
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '6px', 
      height: '40px',
      fontSize: '0.85rem',
      backgroundColor: '#f0f2f5', // Disabled look
      '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #ddd' }
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#333', // Text color dark hi rakha hai taaki read kar sakein
    }
  }

  return (
    <Dialog 
      open={true} 
      onClose={onBack} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: '12px', height: '90vh' }
      }}
      sx={{ 
        '& .MuiBackdrop-root': { 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            backdropFilter: 'blur(3px)' 
        } 
      }}
    >
      
      <DialogContent dividers sx={{ p: 2, backgroundColor: '#fff' }}>
        {/* Title with Close Icon */}
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>View Category Details</Typography>
          <IconButton onClick={onBack} size="small"><i className="ri-close-line" /></IconButton>
        </DialogTitle>
        
        {/* 1. Category Image Section (Read Only) */}
        <Box sx={SectionBox}>
          <Typography sx={LabelStyle}>Category Image</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
            <Avatar 
              src={data?.image} 
              sx={{ width: 100, height: 100, mb: 1, border: '1px solid #eee' }} 
            />
            <Typography sx={{ fontSize: '0.7rem', color: '#999' }}>ID: {data?.id}</Typography>
          </Box>
        </Box>

        {/* 2. English Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>EN</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>English</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name</Typography>
          <TextField 
            fullWidth 
            disabled 
            value={data?.name || ''}
            sx={InputStyle} 
          />
        </Box>

        {/* 3. German Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>DE</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>German</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name</Typography>
          <TextField 
            fullWidth 
            disabled 
            value={data?.nameDe || 'N/A'}
            sx={InputStyle} 
          />
        </Box>

        {/* 4. Turkish Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#fff3e0', color: '#ef6c00', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>TR</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Turkish</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name</Typography>
          <TextField 
            fullWidth 
            disabled 
            value={data?.nameTr || 'N/A'}
            sx={InputStyle} 
          />
        </Box>

        {/* 5. Commission Settings */}
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, mb: 1.5, mt: 1 }}>Commission Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Product Commission (%)</Typography>
            <TextField 
              fullWidth 
              disabled 
              value={data?.productComm || 0} 
              sx={InputStyle} 
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Delivery Commission (%)</Typography>
            <TextField 
              fullWidth 
              disabled 
              value={data?.deliveryComm || 0} 
              sx={InputStyle} 
            />
          </Grid>
        </Grid>

        {/* Footer Buttons */}
        <DialogActions sx={{ p: 2, mt: 3 }}>
          <Button 
            fullWidth
            onClick={onBack} 
            variant="contained" 
            sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', fontWeight: 600 }}
          >
            Close
          </Button>
        </DialogActions>

      </DialogContent>
    </Dialog>
  );
};

export default ViewCategory;