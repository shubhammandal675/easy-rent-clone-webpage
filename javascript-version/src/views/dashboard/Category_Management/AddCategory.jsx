'use client'
import React, { useState } from 'react'
import { 
  Dialog, DialogTitle, DialogContent, Box, TextField, 
  Button, Typography, IconButton, Grid, Avatar, DialogActions, Divider
} from '@mui/material'

const AddCategory = ({ onBack, setCategories }) => {
  const [form, setForm] = useState({ 
    nameEn: '', nameDe: '', nameTr: '', 
    productComm: '0', deliveryComm: '0', image: null 
  });

  // Styles as per the image
  const SectionBox = {
    border: '1px solid #e0e4ec',
    borderRadius: '10px',
    p: 2,
    mb: 2,
    position: 'relative'
  }

  const LabelStyle = { fontSize: '0.75rem', fontWeight: 600, color: '#333', mb: 0.5 }
  const InputStyle = { 
    '& .MuiOutlinedInput-root': { 
      borderRadius: '6px', 
      height: '40px',
      fontSize: '0.85rem',
      backgroundColor: '#fff'
    } 
  }

  const handleSave = () => {
    setCategories(prev => [...prev, { 
      id: `CAT-${Math.floor(Math.random() * 1000)}`, 
      name: form.nameEn || 'New Category', 
      status: 'Active', 
      active: true, 
      productComm: form.productComm, 
      deliveryComm: form.deliveryComm, 
      image: form.image || 'https://via.placeholder.com/150' 
    }]);
    onBack();
  };

  return (
    <Dialog 
      open={true} 
      onClose={onBack} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: '12px', height: '90vh' }
      }}
    >
      
      <DialogContent dividers sx={{ p: 2, backgroundColor: '#fff' }}>
        {/* Title with Close Icon */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 , mb:3}}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Add Category</Typography>
        <IconButton onClick={onBack} size="small"><i className="ri-close-line" /></IconButton>
      </DialogTitle>
        
        {/* 1. Category Image Section */}
        <Box sx={SectionBox}>
          <Typography sx={LabelStyle}>Category Image <span style={{color:'red'}}>*</span></Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
            <Avatar 
              src={form.image} 
              sx={{ width: 100, height: 100, mb: 1.5, border: '1px solid #eee' }} 
            />
            <Button
              variant="contained"
              component="label"
              size="small"
              sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3 }}
            >
              Upload
              <input type="file" hidden onChange={(e) => setForm({...form, image: URL.createObjectURL(e.target.files[0])})} />
            </Button>
          </Box>
        </Box>

        {/* 2. English Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>EN</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>English</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name <span style={{color:'red'}}>*</span></Typography>
          <TextField 
            fullWidth placeholder="Enter category" 
            sx={InputStyle} 
            onChange={(e) => setForm({...form, nameEn: e.target.value})} 
          />
        </Box>

        {/* 3. German Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>DE</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>German</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name <span style={{color:'red'}}>*</span></Typography>
          <TextField 
            fullWidth placeholder="Enter category" 
            sx={InputStyle} 
            onChange={(e) => setForm({...form, nameDe: e.target.value})} 
          />
        </Box>

        {/* 4. Turkish Section */}
        <Box sx={SectionBox}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: '#fff3e0', color: '#ef6c00', fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>TR</Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Turkish</Typography>
          </Box>
          <Typography sx={LabelStyle}>Category Name <span style={{color:'red'}}>*</span></Typography>
          <TextField 
            fullWidth placeholder="Enter category" 
            sx={InputStyle} 
            onChange={(e) => setForm({...form, nameTr: e.target.value})} 
          />
        </Box>

        {/* 5. Commission Settings */}
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, mb: 1.5, mt: 1 }}>Commission Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Product Commission (%)</Typography>
            <TextField 
              fullWidth type="number" value={form.productComm} 
              sx={InputStyle} 
              onChange={(e) => setForm({...form, productComm: e.target.value})} 
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={LabelStyle}>Delivery Commission (%)</Typography>
            <TextField 
              fullWidth type="number" value={form.deliveryComm} 
              sx={InputStyle} 
              onChange={(e) => setForm({...form, deliveryComm: e.target.value})} 
            />
          </Grid>
        </Grid>

        {/* Fixed Footer Buttons */}
      <DialogActions sx={{ p: 2, gap: 1 ,mt:3}}>
        <Button 
          variant="contained" 
          onClick={handleSave}
          sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3, fontWeight: 600 }}
        >
          Add
        </Button>
        <Button 
          onClick={onBack} 
          variant="outlined" 
          sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3 }}
        >
          Cancel
        </Button>
      </DialogActions>

      </DialogContent>

      
    </Dialog>
  );
};

export default AddCategory;