'use client'
import React, { useState } from 'react'
import {
    Box, Typography, Grid, Card, Chip, Button,
    TextField, Avatar, Divider, Paper, MenuItem, Select, FormControl
} from '@mui/material'

const DisputeView = ({ data, onBack }) => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";
    const [status, setStatus] = useState('OPEN');

    // Custom Label Styles
    const labelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#666', mb: 0.5, fontFamily: outfitFont };
    const valueStyle = { fontSize: '0.9rem', fontWeight: 600, color: '#333', fontFamily: outfitFont };

    if (!data) return null;

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6, fontFamily: outfitFont }}>
            <Card sx={{ borderRadius: "15px", p: 6, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>

                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: outfitFont }}>
                        View Dispute - {data.id}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont }}
                    >
                        Back to List
                    </Button>
                </Box>

                <Grid container spacing={3}>

                    {/* 1. Product Card Section */}
                    <Grid item xs={12}>
                        <Card sx={{ p: 3, borderRadius: '15px', mb: 3, boxShadow: 'none', border: '1px solid #eef0f2' }}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Box sx={{ width: 100, height: 100, borderRadius: '12px', bgcolor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="ri-image-line" style={{ fontSize: '2rem', color: '#999' }}></i>
                                    </Box>
                                </Grid>
                                <Grid item xs>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', fontFamily: outfitFont }}>Lounge Sofa</Typography>
                                            <Typography sx={{ color: '#888', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <i className="ri-map-pin-line"></i> New York City, New York
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: '#4caf50', fontWeight: 700, fontSize: '1.1rem', fontFamily: outfitFont }}>$18/day</Typography>
                                    </Box>
                                    <Box sx={{ mt: 2, bgcolor: '#eef2ff', p: 1, borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                                        <i className="ri-time-line" style={{ color: '#00cfd5' }}></i>
                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', fontFamily: outfitFont }}>
                                            Rental Period: 01 Jan 2026 09 AM - 02 Jan 2026 09 AM
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography sx={labelStyle}>Vendor Delivery Charge:</Typography>
                                    <Typography sx={valueStyle}>$5</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={{ p: 1.5, bgcolor: '#fff5f5', border: '1px solid #ffcdd2', borderRadius: '8px' }}>
                                        <Typography sx={{ color: '#d32f2f', fontWeight: 700, fontSize: '0.8rem', fontFamily: outfitFont }}>Important Note</Typography>
                                        <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', fontFamily: outfitFont }}>Extra charges will apply if product is not returned on time</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={labelStyle}>Selected Address:</Typography>
                                    <Typography sx={valueStyle}>2458 Sunset Blvd, Apt 12B, Los Angeles, CA 90026, United States</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* 2. Order Summary & Dispute Status Row */}
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 3, borderRadius: '15px', height: '100%', boxShadow: 'none', border: '1px solid #eef0f2' }}>
                                <Typography sx={{ fontWeight: 700, mb: 3, fontFamily: outfitFont }}>Order Summary</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography sx={{ color: '#666', fontFamily: outfitFont }}>Order ID</Typography>
                                    <Typography sx={{ fontWeight: 700, color: '#00cfd5', fontFamily: outfitFont }}>#ERA1211</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography sx={{ color: '#666', fontFamily: outfitFont }}>Product</Typography>
                                    <Typography sx={{ fontWeight: 600, fontFamily: outfitFont }}>Lounge Sofa</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography sx={{ color: '#666', fontFamily: outfitFont }}>Sub Total</Typography>
                                    <Typography sx={{ fontWeight: 600, fontFamily: outfitFont }}>$36</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography sx={{ color: '#666', fontFamily: outfitFont }}>Delivery Charges</Typography>
                                    <Typography sx={{ fontWeight: 600, fontFamily: outfitFont }}>$10</Typography>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 800, fontFamily: outfitFont }}>Total Amount</Typography>
                                    <Typography sx={{ fontWeight: 800, color: '#4caf50', fontSize: '1.2rem', fontFamily: outfitFont }}>$46</Typography>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 3, borderRadius: '15px', height: '100%', boxShadow: 'none', border: '1px solid #eef0f2' }}>
                                <Typography sx={{ fontWeight: 700, mb: 2, fontFamily: outfitFont }}>Dispute Status</Typography>
                                <Typography sx={labelStyle}>Update Status</Typography>
                                <Select fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ borderRadius: '8px', mb: 3 }}>
                                    <MenuItem value="OPEN">OPEN</MenuItem>
                                    <MenuItem value="CLOSED">CLOSED</MenuItem>
                                </Select>
                                <Typography sx={labelStyle}>Current Status</Typography>
                                <Chip label={status} size="small" sx={{ bgcolor: '#fff3e0', color: '#ff9800', fontWeight: 700, borderRadius: '6px' }} />
                            </Card>
                        </Grid>
                    </Grid>

                    {/* 3. Dispute Details Section */}
                    <Grid item xs={12}>
                        <Card sx={{ p: 3, borderRadius: '15px', boxShadow: 'none', border: '1px solid #eef0f2' }}>
                            <Typography sx={{ fontWeight: 700, mb: 3, fontFamily: outfitFont }}>Dispute Details</Typography>

                            <Typography sx={labelStyle}>Dispute Title</Typography>
                            <TextField fullWidth size="small" value={data.title} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />

                            <Typography sx={labelStyle}>Dispute Description</Typography>
                            <TextField fullWidth multiline rows={4} placeholder="Provide detailed description..." sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />

                            <Typography sx={labelStyle}>Attach Media</Typography>
                            <Box sx={{ border: '2px dashed #e0e0e0', borderRadius: '12px', p: 4, textAlign: 'center', bgcolor: '#fafafa' }}>
                                <i className="ri-upload-cloud-2-line" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                <Typography sx={{ fontSize: '0.85rem', color: '#666', mt: 1, fontFamily: outfitFont }}>Click to upload or drag and drop</Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: '#999', fontFamily: outfitFont }}>PNG, JPG, GIF up to 10MB</Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 4. Conversation Thread Section */}
                    <Grid item xs={12}>
                        <Card sx={{ p: 3, borderRadius: '15px', boxShadow: 'none', border: '1px solid #eef0f2' }}>
                            <Typography sx={{ fontWeight: 700, mb: 3, fontFamily: outfitFont }}>Conversation Thread</Typography>

                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <Avatar sx={{ bgcolor: '#eef2ff', color: '#3f51b5', fontSize: '0.8rem' }}>A</Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#3f51b5', mb: 0.5 }}>Admin Support</Typography>
                                    <Paper sx={{ p: 1.5, bgcolor: '#f0f4ff', borderRadius: '0 12px 12px 12px', boxShadow: 'none' }}>
                                        <Typography sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>Explain your issue in detail so we can assist you better.</Typography>
                                    </Paper>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: 'row-reverse' }}>
                                <Avatar sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontSize: '0.8rem' }}>U</Avatar>
                                <Box sx={{ flex: 1, textAlign: 'right' }}>
                                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#2e7d32', mb: 0.5 }}>User</Typography>
                                    <Paper sx={{ p: 1.5, bgcolor: '#f1f8e9', borderRadius: '12px 0 12px 12px', display: 'inline-block', textAlign: 'left', boxShadow: 'none' }}>
                                        <Typography sx={{ fontSize: '0.85rem', fontFamily: outfitFont }}>The product received was damaged.</Typography>
                                    </Paper>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
                                <TextField fullWidth size="small" placeholder="Type your reply..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px' } }} />
                                <Button variant="contained" sx={{ bgcolor: '#2962ff', borderRadius: '8px', textTransform: 'none', px: 3 }}>Send</Button>
                            </Box>
                        </Card>
                    </Grid>

                </Grid>
            </Card>
        </Box>
    )
}

export default DisputeView;