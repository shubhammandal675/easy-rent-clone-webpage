'use client'
import React, { useState } from 'react'
import { Box, Card, Typography, Button, Tabs, Tab } from '@mui/material'

// Internal Imports
import StatsGrid from './StatsGrid'
import ReportFilters from './ReportFilters'
import OrderReport from './OrderReport'
import VendorReport from './VendorReport'
import DeliveryReport from './DeliveryReport'
import CustomerReport from './CustomerReport'

const TabSwitcher = () => {
    const [activeTab, setActiveTab] = useState('order')
    const [status, setStatus] = useState('Select Status')
    
    // Independent pagination memory
    const [pageStates, setPageStates] = useState({
        order: 1,
        vendor: 1,
        delivery: 1,
        customer: 1
    })

    const rowsPerPage = 5

    // --- REAL TYPE STATS DATA ---
    const allStatsData = {
        order: [
            { title: 'Total Orders', value: '1,284', icon: 'ri-shopping-cart-2-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Active Rentals', value: '432', icon: 'ri-time-line', color: '#26c6f9', bg: '#e9faff' },
            { title: 'Completed', value: '812', icon: 'ri-checkbox-circle-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Revenue', value: '₹4.2L', icon: 'ri-money-dollar-circle-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Cancelled', value: '40', icon: 'ri-close-circle-line', color: '#ff4d49', bg: '#fff0f0' },
        ],
        vendor: [
            { title: 'Total Vendors', value: '156', icon: 'ri-store-2-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'Active Shops', value: '142', icon: 'ri- medal-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Pending Approval', value: '14', icon: 'ri-error-warning-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Top Rated', value: '88', icon: 'ri-star-line', color: '#26c6f9', bg: '#e9faff' },
            { title: 'Blacklisted', value: '2', icon: 'ri-prohibited-line', color: '#ff4d49', bg: '#fff0f0' },
        ],
        delivery: [
            { title: 'Total Partners', value: '84', icon: 'ri-truck-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'On Duty', value: '52', icon: 'ri-user-follow-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Avg Time', value: '38m', icon: 'ri-speed-up-line', color: '#26c6f9', bg: '#e9faff' },
            { title: 'Failed Delivery', value: '12', icon: 'ri-moped-line', color: '#ff4d49', bg: '#fff0f0' },
            { title: 'In Transit', value: '24', icon: 'ri-map-pin-user-line', color: '#fdb528', bg: '#fff8e5' },
        ],
        customer: [
            { title: 'Total Users', value: '8,432', icon: 'ri-group-line', color: '#666cff', bg: '#f0f1ff' },
            { title: 'New Signups', value: '124', icon: 'ri-user-add-line', color: '#72e128', bg: '#f2fbe9' },
            { title: 'Premium', value: '2.1K', icon: 'ri-vip-crown-line', color: '#fdb528', bg: '#fff8e5' },
            { title: 'Refunds', value: '18', icon: 'ri-refund-2-line', color: '#ff4d49', bg: '#fff0f0' },
            { title: 'Active Now', value: '412', icon: 'ri-pulse-line', color: '#26c6f9', bg: '#e9faff' },
        ]
    }

    const tabsList = [
        { id: 'order', label: 'Order Reports' },
        { id: 'vendor', label: 'Vendor Reports' },
        { id: 'delivery', label: 'Delivery Partner Reports' },
        { id: 'customer', label: 'Customer Reports' }
    ]

    const getTabData = (tab) => {
        switch (tab) {
            case 'order':
                return [
                    { id: 'ORD-7721', col2: 'L-Shape Sofa', col3: 'Amit Sharma', col4: 'Urban Living', col5: 'Delhivery', col6: 'Mumbai', col7: 'Rental', status: 'active' },
                    { id: 'ORD-7722', col2: 'Dining Table', col3: 'Saniya Khan', col4: 'WoodKraft', col5: 'BlueDart', col6: 'Bangalore', col7: 'Direct', status: 'completed' },
                    { id: 'ORD-7723', col2: 'Office Chair', col3: 'Rahul Varma', col4: 'ErgoDesign', col5: 'XpressBees', col6: 'Delhi', col7: 'Rental', status: 'active' },
                    { id: 'ORD-7724', col2: 'King Bed', col3: 'Priya Das', col4: 'Sleepwell', col5: 'Ecom Express', col6: 'Pune', col7: 'Direct', status: 'cancelled' },
                    { id: 'ORD-7725', col2: 'Wardrobe', col3: 'Vikas Jha', col4: 'HomeStyle', col5: 'Delhivery', col6: 'Chennai', col7: 'Rental', status: 'completed' },
                    { id: 'ORD-7726', col2: 'Bookshelf', col3: 'Anjali Goel', col4: 'Urban Living', col5: 'BlueDart', col6: 'Mumbai', col7: 'Direct', status: 'active' },
                ];
            case 'vendor':
                return [
                    { id: 'VND-401', col2: 'Urban Living', col3: 'Rajesh Kumar', col4: 'Furniture', col5: 'Gold', col6: 'Mumbai', col7: 'GST-27AAA', status: 'active' },
                    { id: 'VND-402', col2: 'WoodKraft', col3: 'Suresh Mani', col4: 'Decor', col5: 'Silver', col6: 'Chennai', col7: 'GST-33BBB', status: 'pending' },
                    { id: 'VND-403', col2: 'ErgoDesign', col3: 'Nitin Gadri', col4: 'Office', col5: 'Platinum', col6: 'Gurugram', col7: 'GST-06CCC', status: 'active' },
                    { id: 'VND-404', col2: 'HomeStyle', col3: 'Meena Iyer', col4: 'Kitchen', col5: 'Bronze', col6: 'Kochi', col7: 'GST-32DDD', status: 'inactive' },
                ];
            case 'delivery':
                return [
                    { id: 'DLV-901', col2: 'Delhivery', col3: 'Arjun Singh', col4: 'Bike', col5: '9876543210', col6: 'Mumbai', col7: 'Zone A', status: 'on-duty' },
                    { id: 'DLV-902', col2: 'BlueDart', col3: 'Karan Deep', col4: 'Van', col5: '9123456789', col6: 'Delhi', col7: 'Zone C', status: 'off-duty' },
                    { id: 'DLV-903', col2: 'XpressBees', col3: 'Sumeet Pal', col4: 'Truck', col5: '8877665544', col6: 'Pune', col7: 'Zone B', status: 'on-duty' },
                ];
            case 'customer':
                return [
                    { id: 'CST-101', col2: 'Amit Sharma', col3: 'amit@gmail.com', col4: 'Premium', col5: '5 Orders', col6: 'Mumbai', col7: 'Verified', status: 'active' },
                    { id: 'CST-102', col2: 'Saniya Khan', col3: 'saniya.k@yahoo.com', col4: 'Regular', col5: '2 Orders', col6: 'Bangalore', col7: 'Verified', status: 'active' },
                    { id: 'CST-103', col2: 'Rahul Varma', col3: 'rahulv@outlook.com', col4: 'Guest', col5: '1 Order', col6: 'Delhi', col7: 'Unverified', status: 'blocked' },
                ];
            default: return [];
        }
    }

    const currentFullData = getTabData(activeTab)
    const currentPage = pageStates[activeTab]
    const paginatedData = currentFullData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    const handlePageChange = (direction) => {
        setPageStates(prev => ({
            ...prev,
            [activeTab]: direction === 'next' ? prev[activeTab] + 1 : Math.max(prev[activeTab] - 1, 1)
        }))
    }

    return (
        <Box sx={{ minHeight: '100vh', p: 4 }}>
            <Box sx={{ p: 4, backgroundColor: '#fdfdfd', borderRadius: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Report Management</Typography>
                    <Button variant="contained" sx={{ bgcolor: '#00cfd5', textTransform: 'none' }}>Export</Button>
                </Box>

                <Box sx={{ mb: 4, bgcolor: '#004d4d', borderRadius: '10px', p: 0.8, display: 'inline-flex' }}>
                    <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTabs-indicator': { display: 'none' } }}>
                        {tabsList.map(tab => (
                            <Tab key={tab.id} value={tab.id} label={tab.label} sx={{
                                textTransform: 'none', color: '#fff !important', borderRadius: '8px', px: 3, fontWeight: 700,
                                '&.Mui-selected': { bgcolor: '#fff', color: '#3a3541 !important' }
                            }} />
                        ))}
                    </Tabs>
                </Box>

                {/* --- 🟢 STATS GRID ADDED HERE --- */}
                <StatsGrid stats={allStatsData[activeTab]} />

                <Card sx={{ borderRadius: '12px', border: '1px solid #eaeaeb', boxShadow: 'none', mt: 3 }}>
                    <ReportFilters
                        statusValue={status}
                        onStatusChange={(e) => setStatus(e.target.value)}
                        onReset={() => {
                            setStatus('Select Status')
                            setPageStates(prev => ({ ...prev, [activeTab]: 1 }))
                        }}
                    />
                    
                    {/* Render current table */}
                    {activeTab === 'order' && <OrderReport data={paginatedData} />}
                    {activeTab === 'vendor' && <VendorReport data={paginatedData} />}
                    {activeTab === 'delivery' && <DeliveryReport data={paginatedData} />}
                    {activeTab === 'customer' && <CustomerReport data={paginatedData} />}

                    {/* Pagination */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1, pb: 3 }}>
                        <Button 
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange('prev')}
                            sx={{ bgcolor: '#9ee8eb', color: '#666', borderRadius: '8px', height: 32, px: 2, fontWeight: 600, textTransform: 'none' }}
                        >
                            Previous
                        </Button>
                        <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', bgcolor: '#003b3d', color: '#fff', fontWeight: 600 }}>
                            {currentPage}
                        </Box>
                        <Button 
                            variant="outlined" 
                            disabled={currentPage >= Math.ceil(currentFullData.length / rowsPerPage)}
                            onClick={() => handlePageChange('next')}
                            sx={{ borderRadius: '8px', borderColor: '#ddd', color: '#666', height: 32, px: 2, fontWeight: 600, textTransform: 'none' }}
                        >
                            Next
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}

export default TabSwitcher;