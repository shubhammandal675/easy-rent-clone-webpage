'use client'

import IconButton from '@mui/material/IconButton'

const NavSearch = () => {
  return (
    <div 
      className='flex items-center justify-between px-3 py-1.5 cursor-pointer border rounded-lg hover:bg-gray-50'
      style={{
        backgroundColor: '#F9F4F0', // Matches the light dashboard bg
        minWidth: '220px',
        border: '1px solid #e5e7eb'
      }}
    >
      <div className='flex items-center gap-2'>
        <i className='ri-search-line text-textSecondary text-[18px]' />
        <span className='text-[14px] text-textSecondary font-medium'>Search</span>
      </div>
      
      {/* Keyboard Shortcut Badge */}
      <div className='flex items-center gap-1 px-1.5 py-0.5 rounded border bg-white shadow-sm text-[11px] text-textDisabled font-bold'>
        <span className='text-[13px]'>⌘</span>K
      </div>
    </div>
  )
}

export default NavSearch