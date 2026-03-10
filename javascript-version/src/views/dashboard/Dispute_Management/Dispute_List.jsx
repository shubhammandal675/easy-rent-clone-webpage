'use client'
import React, { useState } from 'react'
import {
    Card, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box, IconButton,
    TextField, Button, InputAdornment, MenuItem, Select
} from '@mui/material'

const DisputeList = ({ onView }) => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

    const [disputes] = useState([
        { id: 'ER101', user: 'Yash', type: 'Delivery', title: 'The person was abusive', date_time: '01-01-2023, 10:00 AM', status: 'open' },
        { id: 'ER102', user: 'Aman', type: 'Product', title: 'Damaged item received', date_time: '02-01-2023, 11:30 AM', status: 'open' },
        { id: 'ER103', user: 'Sneha', type: 'Delivery', title: 'Late delivery experience', date_time: '03-01-2023, 09:15 AM', status: 'open' },
        { id: 'ER104', user: 'Rahul', type: 'Payment', title: 'Double amount deducted', date_time: '04-01-2023, 02:45 PM', status: 'open' },
        { id: 'ER105', user: 'Priya', type: 'Delivery', title: 'The person was abusive', date_time: '05-01-2023, 05:00 PM', status: 'open' },
        { id: 'ER106', user: 'Vikram', type: 'Product', title: 'Wrong size delivered', date_time: '06-01-2023, 12:00 PM', status: 'open' }
    ]);

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6 }}>
            <Card sx={{ borderRadius: "15px", p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', backgroundColor: '#fff' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 1 }}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: outfitFont }}>
                        Dispute Management
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', '&:hover': { bgcolor: '#00b8bc' }, textTransform: 'none', borderRadius: '8px', px: 3, fontFamily: outfitFont, fontWeight: 500 }}>
                        Export
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', px: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, '& .MuiInputBase-input': { fontFamily: outfitFont, fontSize: '0.9rem' } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
                    />

                    <Select
                        size="small"
                        defaultValue="Select Status"
                        sx={{ width: 180, borderRadius: '8px', fontFamily: outfitFont, color: '#666', fontSize: '0.9rem' }}
                    >
                        <MenuItem value="Select Status" disabled sx={{ fontFamily: outfitFont }}>Select Status</MenuItem>
                        <MenuItem value="open" sx={{ fontFamily: outfitFont }}>Open</MenuItem>
                        <MenuItem value="closed" sx={{ fontFamily: outfitFont }}>Closed</MenuItem>
                    </Select>

                    <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', p: '8px' }}>
                        <i className="ri-arrow-up-down-line" style={{ fontSize: '1.1rem' }} />
                    </IconButton>

                    <Button sx={{ color: '#000', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 2, fontFamily: outfitFont, fontWeight: 400 }}>
                        Reset
                    </Button>
                </Box>

                <TableContainer sx={{ border: '1px solid #f0f2f5', borderRadius: '12px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'User', 'Type', 'Title', 'Date/Time', 'Status', 'Action'].map((head) => (
                                    <TableCell key={head} align="left" sx={{ fontWeight: 600, color: '#8e98a8', fontSize: '0.75rem', fontFamily: outfitFont, padding: '12px 16px', borderBottom: '1px solid #f0f2f5', letterSpacing: '0.05rem' }}>
                                        {head.toUpperCase()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {disputes.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.id}</TableCell>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', fontWeight: 500, color: '#111' }}>{row.user}</TableCell>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#444' }}>{row.type}</TableCell>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#666', maxWidth: '250px' }}>{row.title}</TableCell>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem', color: '#666' }}>{row.date_time}</TableCell>
                                    <TableCell sx={{ padding: '12px 16px', fontFamily: outfitFont, fontSize: '0.85rem' }}>
                                        <Box sx={{ textTransform: 'capitalize', color: row.status === 'open' ? '#666' : '#4caf50', fontWeight: 600 }}>{row.status}</Box>
                                    </TableCell>
                                    <TableCell sx={{ padding: '12px 16px' }}>
                                        <IconButton onClick={() => onView(row)} size="small" sx={{ color: '#8e98a8', p: 0.5 }}>
                                            <i className="ri-eye-line" style={{ fontSize: '1.1rem' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                    <Button sx={{ bgcolor: '#9ee8eb', color: '#555', textTransform: 'none', borderRadius: '8px', height: 32, px: 2, fontFamily: outfitFont, fontWeight: 500, "&:hover": { bgcolor: '#86d2d5' }, boxShadow: 'none' }}>Previous</Button>
                    <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontWeight: 600, fontFamily: outfitFont, fontSize: '0.9rem' }}>1</Box>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#ddd', color: '#666', height: 32, px: 2, fontFamily: outfitFont, fontWeight: 500 }}>Next</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default DisputeList;