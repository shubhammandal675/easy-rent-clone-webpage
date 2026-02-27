// Style Imports
import { menuClasses } from '@menu/utils/menuClasses'

const menuItemStyles = (theme) => {
  const activeHoverColor = '#07b2b4' // Aapka Teal color

  return {
    root: {
      marginBlockStart: theme.spacing(1.5),
      
      // --- ACTIVE STATE: Ye hamesha highlight rahega ---
      [`& .${menuClasses.button}.${menuClasses.active}`]: {
        backgroundColor: `${activeHoverColor} !important`,
        color: '#ffffff !important',
        borderRadius: '10px !important', 
        marginLeft: '18px !important',
        marginRight: '15px !important',
        boxShadow: '0px 4px 10px rgba(7, 178, 180, 0.3)', 
        
        [`& .${menuClasses.icon}`]: { 
          color: '#ffffff !important' 
        },
        [`& .${menuClasses.label}`]: { 
          color: '#ffffff !important',
          fontWeight: '600 !important' 
        }
      }
    },
    button: {
      paddingBlock: theme.spacing(2.5),
      marginLeft: '15px',
      marginRight: '15px',
      transition: 'all 0.2s ease-in-out',
      borderRadius: '10px !important',
      color: 'rgba(255, 255, 255, 0.7)', // Default text color

      // --- HOVER STATE: Sirf tab dikhega jab item active NA HO ---
      [`&:not(.${menuClasses.active}):hover`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.08) !important', // Halki white jhalak
        color: '#ffffff !important',
        [`& .${menuClasses.icon}`]: { color: '#ffffff !important' },
        [`& .${menuClasses.label}`]: { color: '#ffffff !important' }
      }
    },
    icon: {
      fontSize: '1.4rem',
      minWidth: '35px',
      color: 'inherit', // Button ka color inherit karega
      paddingRight: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:'-16px !important'
    },
    label: {
      fontFamily: 'Outfit, sans-serif',
      fontSize: '0.85rem',
      fontWeight: 500,
      color: 'inherit', // Button ka color inherit karega
      whiteSpace: 'normal',
      lineHeight: 1.2
    }
  }
}

export default menuItemStyles