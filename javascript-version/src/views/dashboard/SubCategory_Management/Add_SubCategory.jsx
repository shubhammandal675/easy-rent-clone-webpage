'use client'
import React, { useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, Box, TextField,
    Button, Typography, IconButton, Avatar, DialogActions, MenuItem, Select
} from '@mui/material'

const Add_SubCategory = ({ onBack, setSubCategories }) => {
    const [form, setForm] = useState({
        parentCategory: '', nameEn: '', nameDe: '', nameTr: '', image: null
    });

    // UI Styles based on your screenshots
    const SectionBox = {
        border: '1px solid #e0e4ec',
        borderRadius: '10px',
        p: 2,
        mb: 2,
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
        // Basic Validation
        if (!form.parentCategory || !form.nameEn) {
            alert("Please fill required fields");
            return;
        }

        setSubCategories(prev => [...prev, {
            id: `SUB-${Math.floor(Math.random() * 1000)}`,
            category: form.parentCategory,
            subCategory: form.nameEn,
            status: 'Active',
            active: true,
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
            PaperProps={{ sx: { borderRadius: '12px', maxHeight: '95vh' } }}
        >


            <DialogContent dividers sx={{ p: 2, backgroundColor: '#fff' }}>
                <Box sx={{ mb: 2 }}>

                    {/* Title */}
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Add Sub Category</Typography>
                        <IconButton onClick={onBack} size="small"><i className="ri-close-line" /></IconButton>
                    </DialogTitle>
                    <Typography sx={LabelStyle}>Select Category <span style={{ color: 'red' }}>*</span></Typography>
                    <Select
                        fullWidth
                        size="small"
                        displayEmpty
                        value={form.parentCategory}
                        onChange={(e) => setForm({ ...form, parentCategory: e.target.value })}
                        sx={{ borderRadius: '6px', height: '40px', fontSize: '0.85rem' }}
                    >
                        <MenuItem value="" disabled>Select Category</MenuItem>
                        <MenuItem value="Dinnerware">Dinnerware</MenuItem>
                        <MenuItem value="Table Accessories">Table Accessories</MenuItem>
                        <MenuItem value="Table Accessories">Macbook Pro</MenuItem>
                        <MenuItem value="Bakeware">Bakeware</MenuItem>
                        <MenuItem value="Cutlery">Cutlery</MenuItem>
                        <MenuItem value="Cutlery">Electronics_test1</MenuItem>
                    </Select>
                </Box>

                {/* 2. Category Image Section */}
                <Box sx={SectionBox}>
                    <Typography sx={LabelStyle}>Category Image <span style={{ color: 'red' }}>*</span></Typography>
                    <Box sx={{ py: 1 }}>
                        {/* Default Placeholder Image if no file uploaded */}
                        <Avatar
                            src={form.image}
                            sx={{
                                width: 110, height: 110, mb: 1.5,
                                border: '1px solid #eee', bgcolor: '#f0f0f0', color: '#ccc'
                            }}
                        >
                            {!form.image && <i className="ri-user-fill" style={{ fontSize: '2.5rem' }} />}
                        </Avatar>
                        <Button
                            variant="contained"
                            component="label"
                            size="small"
                            sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 8, boxShadow: 'none' }}
                        >
                            Upload
                            <input type="file" hidden onChange={(e) => setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) })} />
                        </Button>
                    </Box>
                </Box>

                {/* 3. Language Sections (EN, DE, TR) */}
                {[
                    { code: 'EN', label: 'English', color: '#1976d2', bg: '#e3f2fd', key: 'nameEn' },
                    { code: 'DE', label: 'German', color: '#2e7d32', bg: '#e8f5e9', key: 'nameDe' },
                    { code: 'TR', label: 'Turkish', color: '#ef6c00', bg: '#fff3e0', key: 'nameTr' }
                ].map((lang) => (
                    <Box key={lang.code} sx={SectionBox}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ bgcolor: lang.bg, color: lang.color, fontSize: '0.65rem', fontWeight: 800, px: 0.5, borderRadius: '3px' }}>{lang.code}</Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{lang.label}</Typography>
                        </Box>
                        <Typography sx={LabelStyle}>Sub Category Name <span style={{ color: 'red' }}>*</span></Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter category"
                            sx={InputStyle}
                            onChange={(e) => setForm({ ...form, [lang.key]: e.target.value })}
                        />
                    </Box>
                ))}

                {/* Footer Buttons */}
                <DialogActions sx={{ py: 5, gap: 1 }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ bgcolor: '#00cfd5', textTransform: 'none', borderRadius: '6px', px: 3, fontWeight: 600, boxShadow: 'none' }}
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

export default Add_SubCategory;