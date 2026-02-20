'use client'

import Grid from '@mui/material/Grid'
import StatCard from './StatCard' 
import MonthlySalesChart from './MonthlySalesChart'

const Award = () => {
  const statsData = [
    { title: 'Total Customers', value: '1000', trend: '12.8' },
    { title: 'Total Companies', value: '1000', trend: '12.8' },
    { title: 'Total Delivery Partners', value: '1000', trend: '12.8' },
    { title: 'Total Products', value: '1000', trend: '12.8' },
    { title: 'Total Orders', value: '1000', trend: '12.8' },
    { title: 'Total Earnings', value: '1000', trend: '12.8' }
  ]

  return (
    /* Step 1: The Outer Wrapper 
       Matches the background color and provides the side padding (px-6).
    */
    <div className='w-full bg-[#FFF1E6] min-h-screen px-6 py-8 flex justify-center'>
      
      {/* Step 2: The Grid Container
         'disableEqualOverflow' or manually setting margin to 0 is key here.
         MUI Grids usually have a -24px margin that 'drops' the content off the edge.
      */}
      <Grid 
        container 
        spacing={6} 
        sx={{ 
          width: '100%',
          maxWidth: '1600px', // Matches standard dashboard widths
          margin: 0,           // Fixes the 'drop' issue by zeroing negative margins
          '& > .MuiGrid-item': {
            // Ensures internal spacing is mathematically identical
            paddingTop: '24px !important',
            paddingLeft: '24px !important'
          }
        }}
      >
        {/* Statistics Section (3 items per row) */}
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard 
              title={stat.title} 
              value={stat.value} 
              trend={stat.trend} 
            />
          </Grid>
        ))}

        {/* Chart Section (Full width below cards) */}
        <Grid item xs={12}>
          <MonthlySalesChart />
        </Grid>
      </Grid>
    </div>
  )
}

export default Award