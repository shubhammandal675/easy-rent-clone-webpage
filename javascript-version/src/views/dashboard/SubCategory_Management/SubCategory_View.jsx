'use client'
import React from 'react'
import { Dialog, DialogTitle, DialogContent, Box, TextField, Button, Typography, IconButton, Avatar, DialogActions, Select, MenuItem } from '@mui/material'

const SubCategory_View = ({ data, onBack }) => {
    const SectionBox = { border: '1px solid #e0e4ec', borderRadius: '10px', p: 2, mb: 2 }
    const LabelStyle = { fontSize: '0.75rem', fontWeight: 600, color: '#333', mb: 0.5 }
    const InputStyle = { '& .MuiOutlinedInput-root': { borderRadius: '6px', height: '40px', fontSize: '0.85rem', backgroundColor: '#f9f9f9' } }

    return (
        <Dialog open={true} onClose={onBack} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: '12px', maxHeight: '95vh' } }}>


            <DialogContent dividers sx={{ p: 2, backgroundColor: '#fff' }}>

                <Box sx={{ mb: 2 }}>

                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>View Sub Category</Typography>
                        <IconButton onClick={onBack} size="small"><i className="ri-close-line" /></IconButton>
                    </DialogTitle>

                    <Typography sx={LabelStyle}>Select Category <span style={{ color: 'red' }}>*</span></Typography>
                    <Select fullWidth size="small" value={data.category} disabled sx={{ borderRadius: '6px', height: '40px' }}>
                        <MenuItem value={data.category}>{data.category}</MenuItem>
                    </Select>
                </Box>

                <Box sx={SectionBox}>
                    <Typography sx={LabelStyle}>Category Image <span style={{ color: 'red' }}>*</span></Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
                        <Avatar src={data.image} sx={{ width: 100, height: 100, border: '1px solid #eee' }} />
                    </Box>
                </Box>

                {[
                    { code: 'EN', label: 'English', color: '#1976d2', bg: '#e3f2fd' },
                    { code: 'DE', label: 'German', color: '#2e7d32', bg: '#e8f5e9' },
                    { code: 'TR', label: 'Turkish', color: '#ef6c00', bg: '#fff3e0' }
                ].map((lang) => (
                    <Box key={lang.code} sx={SectionBox}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ bgcolor: lang.bg, color: lang.color, fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>{lang.code}</Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{lang.label}</Typography>
                        </Box>
                        <Typography sx={LabelStyle}>Sub Category Name <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField fullWidth value={data.subCategory} disabled sx={InputStyle} />
                    </Box>
                ))}


                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onBack} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '6px', ml: 'auto', px: 4 }}>
                        Close
                    </Button>
                </DialogActions>


            </DialogContent>
        </Dialog>
    );
};
export default SubCategory_View;