'use client'

import React, { useState } from 'react'
import {
    Card, Typography, Box, TextField, Button, Grid
} from '@mui/material'

const Commission_Management = () => {
    const outfitFont = "'Outfit', 'Outfit Fallback', sans-serif";

    // Form States
    const [platformFees, setPlatformFees] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);

    const handleUpdate = () => {
        console.log("Updated Values:", { platformFees, deliveryCharges });
        alert("Commission settings updated successfully!");
    };

    return (
        <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 6 }}>
            <Card sx={{
                borderRadius: "15px",
                p: 6,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid #eef0f2',
                backgroundColor: '#fff'
            }}>

                {/* Main Heading */}
                <Typography sx={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: outfitFont,
                    mb: 6,
                    color: '#000000'
                }}>
                    Commission Management
                </Typography>

                <Box sx={{ px: 6 }}>
                    {/* Sub Heading */}
                    <Typography sx={{
                        fontSize: '1.1rem',

                        fontWeight: 600,
                        fontFamily: outfitFont,
                        mb: 5,
                        color: '#111'
                    }}>
                        Manage Commission
                    </Typography>

                    {/* Input Fields Grid */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography sx={{
                                    fontSize: '0.90rem',
                                    fontWeight: 500,
                                    fontFamily: outfitFont,
                                    mb: 2,
                                    color: '#666'
                                }}>
                                    Platform Fees (Euro)
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    value={platformFees}
                                    onChange={(e) => setPlatformFees(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            backgroundColor: '#fff'
                                        },
                                        '& .MuiInputBase-input': { fontFamily: outfitFont }
                                    }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography sx={{
                                    fontSize: '0.90rem',
                                    fontWeight: 500,
                                    fontFamily: outfitFont,
                                    mb: 2,
                                    color: '#666'
                                }}>
                                    Delivery Charges Per Mile (Euro)
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    value={deliveryCharges}
                                    onChange={(e) => setDeliveryCharges(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            backgroundColor: '#fff'
                                        },
                                        '& .MuiInputBase-input': { fontFamily: outfitFont }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Update Button */}
                    <Box sx={{ mt: 6 }}>
                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                                bgcolor: '#00cfd5',
                                '&:hover': { bgcolor: '#00b8bc' },
                                textTransform: 'none',
                                borderRadius: '7px',
                                px: 8,
                                py: 2,
                                fontFamily: outfitFont,
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                boxShadow: 'none'
                            }}
                        >
                            Update
                        </Button>
                    </Box>

                </Box>
            </Card>
        </Box>
    )
}

export default Commission_Management;