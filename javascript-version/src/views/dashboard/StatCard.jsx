'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

/**
 * StatCard Component
 * @param {string} title - The label of the metric (e.g., "Total Customers")
 * @param {string|number} value - The main statistic to display
 * @param {string|number} trend - The percentage growth (e.g., "12.8")
 */
const StatCard = ({ title, value, trend }) => {
  return (
    <Card className='shadow-sm border border-gray-100 h-full'>
      <CardContent className='flex flex-col gap-1 relative h-full'>
        
        {/* Top Section: Title & Menu */}
        <div className='flex justify-between items-start'>
          <Typography className='text-[13px] font-bold text-textSecondary uppercase tracking-wider'>
            {title}
          </Typography>
          <IconButton size='small' className='-mt-2 -me-2'>
            <i className='ri-more-2-line text-textDisabled text-sm' />
          </IconButton>
        </div>

        {/* Middle Section: The Big Number */}
        <div className='flex flex-col items-center justify-center py-4'>
          <Typography variant='h3' className='font-bold text-textPrimary'>
            {value}
          </Typography>
        </div>

        {/* Bottom Section: Trend Indicator */}
        <div className='flex items-center justify-center gap-1 mt-auto'>
          <div className='flex items-center text-success font-bold text-[13px]'>
            <i className='ri-arrow-up-line text-sm' />
            <span>{trend}%</span>
          </div>
          <Typography className='text-[13px] text-textDisabled font-medium ps-1'>
            This Month
          </Typography>
        </div>

      </CardContent>
    </Card>
  )
}

export default StatCard