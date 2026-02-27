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
    <div className='w-full min-h-screen px-6 py-8 flex justify-center'>
      <Grid 
        container 
        spacing={6} 
        sx={{ 
          width: '100%',
          maxWidth: '1600px',
          margin: 0,
          '& > .MuiGrid-item': {
            paddingTop: '24px !important',
            paddingLeft: '24px !important'
          }
        }}
      >
        {/* Statistics Section */}
        {statsData.map((stat, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index}
            // sx={{
            //   /* Gray Box Styling */
            //   '& > div': { 
            //     backgroundColor: '#e4e7ec', // Light gray color
            //     transition: 'all 0.3s ease',
            //     '&:hover': {
            //       backgroundColor: '#eeeeee', // Hover par thoda dark gray

            //     }
            //   }
            // }}
          >
            <StatCard 
              title={stat.title} 
              value={stat.value} 
              trend={stat.trend} 
            />
          </Grid>
        ))}

        {/* Chart Section */}
        <Grid item xs={12}>
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '12px',  }}>
             <MonthlySalesChart />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Award