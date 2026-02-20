// React Imports
import { forwardRef, useEffect, useState } from 'react'

// Styled Component Imports
import StyledSubMenuContent from '../../styles/StyledSubMenuContent'

// Style Imports
import styles from '../../styles/styles.module.css'

const SubMenuContent = (props, ref) => {
  // Props
  const { children, open, level, transitionDuration, ...rest } = props

  // States
  const [mounted, setMounted] = useState(false)

  // Refs
  const SubMenuContentRef = ref

  useEffect(() => {
    if (mounted) {
      if (open) {
        const target = SubMenuContentRef?.current

        if (target) {
          target.style.display = 'block'
          target.style.overflow = 'hidden'
          target.style.blockSize = 'auto'
          const height = target.offsetHeight

          target.style.blockSize = '0px'
          target.offsetHeight
          target.style.blockSize = `${height}px`
          setTimeout(() => {
            target.style.overflow = 'auto'
            target.style.blockSize = 'auto'
          }, transitionDuration)
        }
      } else {
        const target = SubMenuContentRef?.current

        if (target) {
          target.style.overflow = 'hidden'
          target.style.blockSize = `${target.offsetHeight}px`
          target.offsetHeight
          target.style.blockSize = '0px'
          setTimeout(() => {
            target.style.overflow = 'auto'
            target.style.display = 'none'
          }, transitionDuration)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mounted, SubMenuContentRef])
  useEffect(() => {
    setMounted(true)
  }, [])

// ... keep all existing imports and logic ...

  return (
    <StyledSubMenuContent 
      ref={ref} 
      level={level} 
      open={open} 
      transitionDuration={transitionDuration} 
      {...rest}
      // This ensures the submenu container itself doesn't have a background or border line
      style={{ border: 'none', background: 'transparent' }}
    >
      <ul 
        className={styles.ul}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',         // Slightly smaller gap for sub-items than main items
          paddingTop: '8px',   // Spacing at the top of the submenu
          paddingBottom: '8px',
          listStyle: 'none'
        }}
      >
        {children}
      </ul>
    </StyledSubMenuContent>
  )
}

export default forwardRef(SubMenuContent)