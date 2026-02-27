'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'

// Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'), { ssr: false })

const MonthlySalesChart = () => {
  // Your provided options converted for React
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '40%', // Made slightly thinner for modern look
        dataLabels: {
          position: 'top' // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%"
      },
      offsetY: -25,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'bottom', // Changed to bottom to match your Event Hero screenshot
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: { enabled: true }
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true, // Show labels for professional dashboard feel
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    colors: ['#4C66FB'], // Matches your Event Hero blue
    grid: {
      strokeDashArray: 7,
      borderColor: 'var(--mui-palette-divider)'
    }
  }

  const series = [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  }]

  return (
    <Card className='shadow-sm border border-gray-100'>
      <CardHeader
        title='Monthly Sales'
        action={
          <IconButton size='small'>
            <i className='ri-more-2-line text-textDisabled' />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h6', className: 'font-bold' }}
      />
      <CardContent>
        <AppReactApexCharts 
          type='bar' 
          height={350} 
          width='100%' 
          options={options} 
          series={series} 
        />
      </CardContent>
    </Card>
  )
}

export default MonthlySalesChart