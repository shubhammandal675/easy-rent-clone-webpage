'use client'

import styled from '@emotion/styled'
import { verticalNavClasses } from '../../utils/menuClasses'

const StyledNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  
  /* Sticky Logo Logic */
  position: sticky;
  top: 0;
  z-index: 10;
 background-color: rgb(3 77 79);
 
   
/* Matches your white sidebar background */

  /* Forcefully remove the line that appears on scroll */
  border-bottom: none !important;
  box-shadow: none !important;
  backgroundColor:#000 !important;

  /* Target the template's auto-generated classes */
  &.${verticalNavClasses.header} {
    padding-inline-start: 15px !important; /* Overrides the 20px left-leaning padding */
  }
`

const NavHeader = ({ children }) => {
  return (
    <StyledNavHeader className={verticalNavClasses.header}>
      {children}
    </StyledNavHeader>
  )
}

export default NavHeader