// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

import { usePathname } from 'next/navigation'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)
const VerticalMenu = ({ scrollMenu }) => {
  const theme = useTheme()
  const pathname = usePathname()
  const { isBreakpointReached } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  // --- path---
  const isSelected = (path) => {
    if (!pathname) return false
    if (path === '/' && (pathname === '/' || pathname === '/en')) return true
    const currentPath = pathname.replace(/^\/en/, '') || '/'
    const menuPath = path.replace(/^\/en/, '') || '/'
    return currentPath === menuPath || currentPath.startsWith(menuPath + '/')
  }

  const brandBgColor = 'rgb(3, 77, 79)'

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
      style={{ backgroundColor: brandBgColor }}
    >
      <Menu menuItemStyles={menuItemStyles(theme)}>
        <MenuSection
          label='Menu'
          className="text-[#FFFFFF] text-l "
        >

          <MenuItem href='/'
            active={isSelected('/')}
            icon={<i className='ri-dashboard-fill' />}
          >Dashboard</MenuItem>

          <MenuItem href='/home'
            active={isSelected('/home')}
            icon={<i className='ri-home-line' />}>
            Home Management
          </MenuItem>

          <MenuItem href='/customer'
            active={isSelected('/customer')}
            icon={<i className='ri-user-star-line' />}
          > Customer Management </MenuItem>

          <MenuItem href='/company'
            active={isSelected('/company')}
            icon={<i className='ri-building-line' />}
          > Company Management </MenuItem>

          <MenuItem href='/dpartner'
            active={isSelected('/dpartner')}
            icon={<i className='ri-truck-line' />}
          > Delivery Partner Management </MenuItem>

          <MenuItem href='/category'
            active={isSelected('/category')}
            icon={<i className='ri-grid-line' />}
          > Category Management </MenuItem>

          <MenuItem href='/sub-category'
            active={isSelected('/sub-category')}
            icon={<i className='ri-box-3-line' />}
          > Sub Category Management </MenuItem>

          <MenuItem href='/product'
            active={isSelected('/product')}
            icon={<i className='ri-box-3-fill' />}
          > Product Management </MenuItem>

          <MenuItem href='/order'
            active={isSelected('/order')}
            icon={<i className='ri-file-paper-2-line' />}
          >
            Order Management </MenuItem>

          <MenuItem href='/delivery'
            active={isSelected('/delivery')}
            icon={<i className='ri-route-line' />}
          > Delivery Management </MenuItem>

          <MenuItem href='/rating'
            active={isSelected('/rating')}
            icon={<i className='ri-account-circle-line' />}
          > Ratings Management </MenuItem>

          <MenuItem href='/payment'
            active={isSelected('/payment')}
            icon={<i className='ri-account-circle-line' />}
          > Payment Management </MenuItem>

          <MenuItem href='/dispute'
            active={isSelected('/dispute')}
            icon={<i className='ri-file-warning-line' />}
          > Dispute Management </MenuItem>

          <MenuItem
            href="/commission"
            active={isSelected('/commission')}
            icon={<i className='ri-money-dollar-circle-line' />}
          > Commission Management</MenuItem>


          <MenuItem
            href="/sub-admin"
            active={isSelected('/sub-admin')}
           icon={<i className='ri-user-settings-line' />}
          > Sub Admin Management</MenuItem>
         
         <MenuItem
            href="/notification"
            active={isSelected('/notification')}
          icon={<i className='ri-notification-3-line' />}  
          > Notification Management</MenuItem>

          {/* ... more items ... */}

          <SubMenu label='Cms Management'

            icon={<i className='ri-pages-line' />}
            active={pathname.includes('terms-conditions') || pathname.includes('privacy-policy')}>
            <MenuItem sx={{gap:"0px"}} 
            href='/terms-conditions' active={isSelected('/terms-conditions')}>Terms & Conditions</MenuItem>
            <MenuItem 
            sx={{gap:"0px"}}
            href='/privacy-policy' active={isSelected('/privacy-policy')}>Privacy Policy</MenuItem>
            <MenuItem 
            sx={{gap:"0px"}}
            href='/faqs' active={isSelected('/faqs')}>FAQ's</MenuItem>
          </SubMenu>
        

           <MenuItem
            href="/report"
            active={isSelected('/report')}
           icon={<i className='ri-account-circle-line' />}
          > Report Management</MenuItem>

 
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
