'use client'
import React from 'react'
import { 
    Box, Card, Typography, TextField, Button, Grid, Rating, 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Avatar, InputAdornment, Select, MenuItem, IconButton 
} from '@mui/material'
import ReactApexChart from 'react-apexcharts';

const View_Rating = ({ selectedItem, categoryData, onBack }) => {
    const outfitFont = "'Outfit', sans-serif";

    // Chart Options as per Screenshot
    const chartOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        plotOptions: { 
            bar: { 
                horizontal: true, 
                barHeight: '25%', 
                borderRadius: 4,
                colors: { backgroundBarColors: ['#f2f4f7'], backgroundBarOpacity: 1 }
            } 
        },
        colors: ['#00cfd5'],
        dataLabels: { enabled: false },
        xaxis: { 
            categories: ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'],
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { 
            labels: { 
                style: { fontFamily: outfitFont, fontSize: '13px', fontWeight: 500, colors: '#666' } 
            } 
        },
        grid: { show: false }
    };

    const chartSeries = [{ name: 'Reviews', data: [300, 80, 25, 6, 0] }];

    return (
        <Box sx={{  minHeight: '100vh', p: 4 }}>

             <Card sx={{ borderRadius: "15px", p: 6, backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2' }}>
            {/* Header with Back Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: outfitFont ,color:'#000'}}>Reviews</Typography>
                <Button 
                    onClick={onBack} 
                    variant="outlined" 
                    sx={{ textTransform: 'none', color: '#00cfd5', borderColor: '#00cfd5', borderRadius: '8px', px: 3, '&:hover': { borderColor: '#00b8bc' } }}
                >
                    Back
                </Button>
            </Box>

            {/* --- Rating Summary Card (Screenshot Design) --- */}
            <Card sx={{ borderRadius: '15px', p: 4, mb: 4, border: '1px solid #eef0f2', boxShadow: 'none', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '850px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* Left: Score */}
                    <Box sx={{ textAlign: 'center', minWidth: '150px' }}>
                        <Box sx={{ 
                            width: 75, height: 75, bgcolor: '#4b5563', borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', mb: 1.5 
                        }}>
                            <Typography sx={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700 }}>
                                {selectedItem?.rating?.split('/')[0] || '4.5'}
                            </Typography>
                        </Box>
                        <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ color: '#ffb400' }} />
                        <Typography sx={{ fontSize: '0.85rem', color: '#8e98a8', mt: 0.5 }}>411 reviews</Typography>
                    </Box>

                    {/* Right: Horizontal Chart */}
                    <Box sx={{ flexGrow: 1 }}>
                        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={220} />
                    </Box>
                    
                    {/* Count labels on the far right */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '18px', pt: '10px' }}>
                        {[300, 80, 25, 6, 0].map((num, i) => (
                            <Typography key={i} sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>{num}</Typography>
                        ))}
                    </Box>
                </Box>
            </Card>

            {/* --- Search and Filters --- */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                <TextField 
                    size="small" 
                    placeholder="Search by name or email" 
                    sx={{ width: 320, bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} 
                    InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }} 
                />
                <Select size="small" defaultValue="all" sx={{ width: 160, borderRadius: '8px', bgcolor: '#fff' }}>
                    <MenuItem value="all">Select Status</MenuItem>
                </Select>
                <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', bgcolor: '#fff' }}><i className="ri-arrow-up-down-line" /></IconButton>
                <Button sx={{ color: '#333', textTransform: 'none', border: '1px solid #ddd', borderRadius: '8px', px: 3, bgcolor: '#fff' }}>Reset</Button>
            </Box>

            {/* --- Table --- */}
            <Card sx={{ borderRadius: '15px', border: '1px solid #eef0f2', boxShadow: 'none', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#fafbfd' }}>
                            <TableRow>
                                {['ID', 'User', 'Product', 'Rating', 'Review', 'Date'].map((h) => (
                                    <TableCell key={h} sx={{ color: '#8e98a8', fontSize: '0.75rem', fontWeight: 600 }}>{h.toUpperCase()}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ color: '#666', fontSize: '0.85rem' }}>{row.id}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar src={row.img} sx={{ width: 32, height: 32 }} />
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{row.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '0.85rem' }}>{selectedItem?.name || 'Lounge Sofa'}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <i className="ri-star-fill" style={{ color: '#ffb400', fontSize: '14px' }} />
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{row.rating.split('/')[0]}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#666', fontSize: '0.85rem', maxWidth: 350 }}>{row.review}</TableCell>
                                    <TableCell sx={{ color: '#666', fontSize: '0.85rem' }}>01-01-2026</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* --- Pagination (Teal Style) --- */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, gap: 1 }}>
                    <Button variant="contained" sx={{ bgcolor: '#b2ebf2', color: '#003b3d', textTransform: 'none', boxShadow: 'none', height: 32, borderRadius: '6px', fontSize: '0.8rem', '&:hover': { bgcolor: '#80deea' } }}>
                        Previous
                    </Button>
                    <Box sx={{ width: 32, height: 32, bgcolor: '#003b3d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                        1
                    </Box>
                    <Button variant="outlined" sx={{ color: '#8e98a8', borderColor: '#ddd', textTransform: 'none', height: 32, borderRadius: '6px', fontSize: '0.8rem' }}>
                        Next
                    </Button>
                </Box>
            </Card>
            </Card>
        </Box>
    );
}

export default View_Rating;

