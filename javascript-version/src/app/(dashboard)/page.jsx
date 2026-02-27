'use client'

import HomeManagement from '@/views/dashboard/home_management'
import Grid from '@mui/material/Grid'
import Dashboard from '@/views/dashboard/Dashboard' // Ensure this path is correct

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dashboard />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics