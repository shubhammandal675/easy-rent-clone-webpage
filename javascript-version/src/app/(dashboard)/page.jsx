'use client'

import Grid from '@mui/material/Grid'
import Award from '@views/dashboard/Award' // Ensure this path is correct

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Award />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics