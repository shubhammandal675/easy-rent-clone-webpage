'use client'
import React, { useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, Box, TextField,
    Button, Typography, IconButton, Avatar, DialogActions, MenuItem, Select
} from '@mui/material'

const Edit_SubCategory = ({ data, onBack, setSubCategories }) => {
    const [form, setForm] = useState({ ...data });

    const SectionBox = { border: '1px solid #e0e4ec', borderRadius: '10px', p: 2, mb: 2 }
    const LabelStyle = { fontSize: '0.75rem', fontWeight: 600, color: '#333', mb: 0.5 }
    const InputStyle = { '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '40px', fontSize: '0.85rem' } }

    const handleUpdate = () => {
        setSubCategories(prev => prev.map(item => item.id === data.id ? form : item));
        onBack();
    };

    return (
        <Dialog open={true} onClose={onBack} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: '12px', maxHeight: '95vh' } }}>


            <DialogContent dividers sx={{ p: 2, backgroundColor: '#fff' }}>

                <Box sx={{ mb: 2 }}>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 4 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Edit Sub Category</Typography>
                        <IconButton onClick={onBack} size="small"><i className="ri-close-line" /></IconButton>
                    </DialogTitle>

                    <Typography sx={LabelStyle}>Select Category <span style={{ color: 'red' }}>*</span></Typography>
                    <Select fullWidth size="small" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} sx={{ borderRadius: '6px', height: '40px' }}>
                        <MenuItem value="Dinnerware">Dinnerware</MenuItem>
                        <MenuItem value="Table Accessories">Table Accessories</MenuItem>
                        <MenuItem value="Bakeware">Bakeware</MenuItem>
                        <MenuItem value="Cutlery">Cutlery</MenuItem>
                    </Select>
                </Box>

                <Box sx={SectionBox}>
                    <Typography sx={LabelStyle}>Category Image <span style={{ color: 'red' }}>*</span></Typography>
                    <Box sx={{ py: 1 }}>
                        <Avatar src={form.image} sx={{ width: 100, height: 100, mb: 1.5, border: '1px solid #eee', borderRadius: '50%' }} />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" component="label" size="small" sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '4px', boxShadow: 'none' }}>
                                Edit <input type="file" hidden onChange={(e) => setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) })} />
                            </Button>
                            <Button variant="outlined" size="small" onClick={() => setForm({ ...form, image: null })} sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '4px' }}>
                                Remove
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {[{ code: 'EN', label: 'English', color: '#1976d2', bg: '#e3f2fd' }, { code: 'DE', label: 'German', color: '#2e7d32', bg: '#e8f5e9' }, { code: 'TR', label: 'Turkish', color: '#ef6c00', bg: '#fff3e0' }].map((lang) => (
                    <Box key={lang.code} sx={SectionBox}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ bgcolor: lang.bg, color: lang.color, fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>{lang.code}</Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{lang.label}</Typography>
                        </Box>
                        <Typography sx={LabelStyle}>Sub Category Name <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField fullWidth value={form.subCategory} sx={InputStyle} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} />
                    </Box>
                ))}

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button variant="contained" onClick={handleUpdate} sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3, fontWeight: 600 }}>Update</Button>
                    <Button onClick={onBack} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3 }}>Cancel</Button>
                </DialogActions>


            </DialogContent>
        </Dialog>
    );
};
export default Edit_SubCategory;