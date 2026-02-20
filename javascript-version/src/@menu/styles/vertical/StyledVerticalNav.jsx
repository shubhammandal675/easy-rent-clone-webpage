'use client'

// Third-party Imports
import styled from '@emotion/styled'

// Util Imports
import { verticalNavClasses } from '../../utils/menuClasses'

const StyledVerticalNav = styled.aside`
  position: sticky;
  inset-block-start: 0;
  block-size: 100dvh;
  z-index: 9;
  background-color: #ffffff; /* Ensure white background */

  /* Transition */
  transition-property: inline-size, min-inline-size, margin-inline-start, inset-inline-start;
  transition-duration: ${({ transitionDuration }) => `${transitionDuration}ms`};
  transition-timing-function: ease-in-out;

  /* Width & Min Width */
  inline-size: ${({ width }) => `${width}px`};
  min-inline-size: ${({ width }) => `${width}px`};

  /* Mobile/Breakpoint View: Sidebar slides out from left */
  &.${verticalNavClasses.breakpointReached} {
    position: fixed;
    block-size: 100%;
    inset-block-start: 0;
    inset-inline-start: ${({ width }) => `-${width}px`};
    z-index: 100;
    margin: 0;
    &.${verticalNavClasses.toggled} {
      inset-inline-start: 0;
    }
  }

  /* Desktop View: Sidebar collapses to 80px instead of hiding */
  ${({ isBreakpointReached, collapsedWidth }) =>
    !isBreakpointReached &&
    `
    &.${verticalNavClasses.toggled} {
      /* This is the key change to keep the toggle button visible */
      inline-size: ${collapsedWidth || 80}px;
      min-inline-size: ${collapsedWidth || 80}px;
      
      /* Hide text labels when collapsed if your CSS handles it */
      & .ps-menu-label {
        display: none;
      }
    }
  `}

  /* User Styles */
  ${({ customStyles }) => customStyles}
`

export default StyledVerticalNav