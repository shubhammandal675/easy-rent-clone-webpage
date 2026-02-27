import React from 'react'
import { Grid, Card, Box, Typography } from '@mui/material'

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

export default StatsGrid