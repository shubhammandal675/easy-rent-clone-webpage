'use client'

import VerticalNavContext from '@/@menu/contexts/verticalNavContext'
import useVerticalNav from '@/@menu/hooks/useVerticalNav'
import Link from 'next/link'
import { useContext } from 'react'

const Logo = () => {

  const {isToggled}=useContext(VerticalNavContext);

  console.log("vertical>>>>>>>>>",isToggled )


  return (
    <div className='flex items-center justify-center w-full py-4'>
      <Link href='/en' className='flex items-center justify-center'>
        <div 
          className='flex items-center justify-center shadow-md'
          style={{
            
            backgroundColor: '#555555', // The exact grey from your image
            borderRadius: isToggled ? '0px' :'2px',       
            width: isToggled ? '45px' : '125px',              // Square dimensions
            height: isToggled ? '45px' : '125px',
            display: 'flex',
            padding: '4px'              
          }}
        >
          <img 
            src='/images/logos/navlogo.webp' 
            alt='EasyRent' 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </Link>
    </div>
  )
}

export default Logo