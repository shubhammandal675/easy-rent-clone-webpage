'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'), { ssr: false })

const LineChart = () => {
  const primaryColor = 'var(--mui-palette-primary-main)'

  const series = [{ 
    name: 'Revenue',
    data: [2800, 3200, 2900, 4500, 3800, 5200, 4800] 
  }]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 3,
        color: primaryColor,
        opacity: 0.1
      }
    },
    tooltip: { enabled: true },
    grid: {
      strokeDashArray: 7,
      borderColor: 'var(--mui-palette-divider)',
      padding: {
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
      }
    },
    stroke: {
      width: 4,
      curve: 'smooth', // Changed from straight to smooth for a modern look
      lineCap: 'round'
    },
    colors: [primaryColor],
    markers: {
      size: 0, // Keep it clean, only show on hover
      hover: {
        size: 6,
        sizeOffset: 3
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { 
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '12px' } 
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { 
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '12px' },
        formatter: (value) => `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`
      }
    }
  }

  return (
    <Card className='shadow-sm border border-gray-100'>
      <CardContent className='flex flex-col gap-4'>
        {/* Header with Title and Actions */}
        <div className='flex justify-between items-start'>
          <div>
            <Typography variant='h6' className='font-bold text-textPrimary'>Revenue Growth</Typography>
            <Typography variant='body2' className='text-textDisabled'>Weekly Overview</Typography>
          </div>
          <IconButton size='small' className='-mt-1 -me-2'>
            <i className='ri-more-2-line text-textDisabled' />
          </IconButton>
        </div>

        {/* Big Number and Trend */}
        <div className='flex items-center gap-3'>
          <Typography variant='h4' className='font-bold text-textPrimary'>$86.4k</Typography>
          <div className='flex items-center text-success font-medium text-sm'>
            <i className='ri-arrow-up-line' />
            <span>15.2%</span>
          </div>
        </div>

        {/* The Actual Chart */}
        <div className='min-h-[200px]'>
           <AppReactApexCharts type='line' height={220} width='100%' options={options} series={series} />
        </div>
      </CardContent>
    </Card>
  )
}

export default LineChart