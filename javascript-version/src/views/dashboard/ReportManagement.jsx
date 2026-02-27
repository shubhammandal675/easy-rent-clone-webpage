'use client'

import React, { useState } from 'react'
import {
    Box, Card, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Stack, InputAdornment, Grid, Tab, Tabs, MenuItem,
    Pagination,
    PaginationItem
} from '@mui/material'

// --- 1. FILTERS COMPONENT (Search + Date + Status) ---
const ReportFilters = ({ statusValue, onStatusChange, onReset }) => (
    <Stack direction="row" spacing={2} sx={{ p: 2.5 }} flexWrap="wrap">
        <TextField
            size="small"
            placeholder="Search by name or email"
            sx={{ width: 260 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
        />
        <TextField size="small" type="date" sx={{ width: 200 }} />

        {/* EXACT STATUS DROPDOWN FROM SCREENSHOT */}
        <TextField
            select
            size="small"
            value={statusValue}
            onChange={onStatusChange}
            sx={{ width: 150 }}
        >
            <MenuItem value="Select Status">Select Status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Active Rentals">Active Rentals</MenuItem>
        </TextField>

        <Button
            variant="text"
            onClick={onReset}
            sx={{ color: '#333', fontWeight: 700, textTransform: 'none' }}
        >
            Reset
        </Button>
    </Stack>
)

// --- 2. STATS GRID COMPONENT ---
const StatsGrid = ({ stats }) => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{
                    p: 2.5, display: 'flex', alignItems: 'center', gap: 2,
                    borderRadius: '15px', border: '1px solid #eee', boxShadow: 'none',
                    height: '75px'
                }}>
                    <Box sx={{
                        width: 48, height: 48, display: 'flex', flexShrink: 0,
                        alignItems: 'center', justifyContent: 'center',
                        bgcolor: item.bg, borderRadius: '10px'
                    }}>
                        <i className={item.icon} style={{ color: item.color, fontSize: '24px' }} />
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, display: 'block' }}>{item.title}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#333' }}>{item.value}</Typography>
                    </Box>
                </Card>
            </Grid>
        ))}
    </Grid>
)

// --- 3. MAIN REPORT MANAGEMENT COMPONENT ---
const ReportManagement = () => {
    const [activeTab, setActiveTab] = useState('order')
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState('Select Status')
    const rowsPerPage = 5

    const tabsList = [
        { id: 'order', label: 'Order Reports' },
        { id: 'vendor', label: 'Vendor Reports' },
        { id: 'delivery', label: 'Delivery Partner Reports' },
        { id: 'customer', label: 'Customer Reports' }
    ]

    // Stats Data (As per screenshots)
    const allStatsData = {
        order: [
            { title: 'Total Orders', value: '120', icon: 'ri-shopping-cart-2-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Completed', value: '86', icon: 'ri-checkbox-circle-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Cancelled', value: '12', icon: 'ri-close-circle-line', color: '#ff4d49', bg: '#fff0f0' },
            { title: 'Returned', value: '5', icon: 'ri-restart-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Active Rentals', value: '17', icon: 'ri-time-line', color: '#26c6f9', bg: '#e9faff' },
        ],
        vendor: [
            { title: 'Total vendors', value: '120', icon: 'ri-store-2-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Active vs inactive', value: '86 / 34', icon: 'ri-user-follow-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Order fulfillment', value: '95%', icon: 'ri-history-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Cancellation rate', value: '17%', icon: 'ri-close-line', color: '#9c27b0', bg: '#f3e5f5' },
            { title: 'Dispute count', value: '8', icon: 'ri-error-warning-line', color: '#ff4d49', bg: '#fff0f0' },
        ],
        delivery: [
            { title: 'Total deliveries', value: '1240', icon: 'ri-truck-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Successful deliveries', value: '1120', icon: 'ri-checkbox-circle-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Failed deliveries', value: '85', icon: 'ri-close-circle-line', color: '#ff4d49', bg: '#fff0f0' },
            { title: 'Average time', value: '42 min', icon: 'ri-time-line', color: '#fdb528', bg: '#fff8e5' },
        ],
        customer: [
            { title: 'Total customers', value: '5420', icon: 'ri-group-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Active customers', value: '4210', icon: 'ri-user-heart-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Refund requests', value: '48', icon: 'ri-refund-2-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Disputes raised', value: '19', icon: 'ri-error-warning-line', color: '#ff4d49', bg: '#fff0f0' },
        ]
    }

    // Dummy Data Generation (10 items)
    const getTableData = () => {
        const baseNames = ['Yash', 'Aman', 'Neha', 'Rohit', 'Simran', 'Vikas', 'Pooja', 'Rahul', 'Karan', 'Sonia'];
        return Array.from({ length: 10 }, (_, i) => ({
            id: i < 5 ? `ER10${i + 1}` : `VDR10${i + 1}`,
            col2: i % 2 === 0 ? 'Sofa' : 'Dining Table',
            col3: baseNames[i],
            col4: 'HomeRent Pvt Ltd',
            col5: 'BlueDart',
            col6: 'Delhi',
            col7: 'Home Delivery',
            status: i % 3 === 0 ? 'delivered' : 'active'
        }));
    }

    const currentData = getTableData();
    const paginatedData = currentData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Box sx={{ minHeight: '100vh', p: 4 }}>
            <Box sx={{ p: 4, backgroundColor: '#fdfdfd', borderRadius: '20px' }}>

                {/* Top Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Report Managment</Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5' }}>Export</Button>
                </Box>

                {/* Tabs */}
                <Box sx={{ mb: 4, bgcolor: '#004d4d', borderRadius: '10px', p: 0.8, display: 'inline-flex' }}>
                    <Tabs value={activeTab} onChange={(e, v) => { setActiveTab(v); setPage(1) }} sx={{ '& .MuiTabs-indicator': { display: 'none' } }}>
                        {tabsList.map(tab => (
                            <Tab key={tab.id} value={tab.id} label={tab.label} sx={{
                                textTransform: 'none', color: '#fff !important', borderRadius: '8px', px: 3, fontWeight: 700,
                                '&.Mui-selected': { bgcolor: '#fff', color: '#3a3541 !important' }
                            }} />
                        ))}
                    </Tabs>
                </Box>

                <StatsGrid stats={allStatsData[activeTab]} />

                <Card sx={{ borderRadius: '12px', border: '1px solid #eaeaeb', boxShadow: 'none' }}>
                    {/* Filters with Status Dropdown */}
                    <ReportFilters
                        statusValue={status}
                        onStatusChange={(e) => setStatus(e.target.value)}
                        onReset={() => { setStatus('Select Status'); setPage(1) }}
                    />

                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#fafafa' }}>
                                <TableRow>
                                    {['ID', 'Product', 'Customer', 'Vendor', 'Partner', 'Location', 'Type', 'Status'].map(h => (
                                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{h}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row, idx) => (
                                    <TableRow key={idx} hover>
                                        {Object.values(row).map((val, i) => (
                                            <TableCell key={i} sx={{ fontSize: '0.8rem' }}>{val}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={Math.ceil(currentData.length / rowsPerPage)}
                            page={page}
                            onChange={(e, v) => setPage(v)}
                            renderItem={(item) => (
                                <PaginationItem slots={{ previous: () => 'Previous', next: () => 'Next' }} {...item}
                                    sx={{ borderRadius: '6px', fontWeight: 700, '&.Mui-selected': { bgcolor: '#004d4d', color: '#fff' } }}
                                />
                            )}
                        />
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}

export default ReportManagement