'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import classnames from 'classnames'

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { label: 'English', code: 'en', flag: '/images/logos/british.webp' },
    { label: 'German', code: 'de', flag: '/images/logos/german.webp' },
    { label: 'Turkish', code: 'tr', flag: '/images/logos/turkish.webp' },
  ]
  const [selectedLang, setSelectedLang] = useState(languages[0])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full bg-rgb(3 77 79)')}>
      
      {/* LEFT: Toggle & Search */}
      <div className='flex items-center gap-2 sm:gap-4'>
        <NavToggle />
      </div>

      {/* RIGHT: Actions */}
      <div className='flex items-center gap-2 sm:gap-6'>
        
        {/* --- Language Dropdown --- */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-white hover:bg-gray-50 border-gray-200 transition-all focus:outline-none"
          >
            <img src={selectedLang.flag} alt={selectedLang.code} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
            <span className="hidden md:block text-sm font-medium text-gray-700">{selectedLang.label}</span>
            <i className={`ri-arrow-down-s-line text-xs transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-100 bg-white shadow-xl z-[999] py-1">
              {languages.map((lang) => (
                <button
                
                  key={lang.code}
                  onClick={() => { setSelectedLang(lang); setIsLangOpen(false); }}
                  className={`flex w-full  items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    selectedLang.code === lang.code ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <img src={lang.flag} alt={lang.code} className="w-5 h-4 bg- object-cover rounded-sm" />
                  <span className="whitespace-nowrap">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <ModeDropdown />

        <IconButton className="h-10 w-10 rounded-full border border-gray-200 bg-white text-textPrimary dark:border-gray-800">
          <i className="ri-notification-3-line text-[20px]" />
        </IconButton>

        {/* User Profile */}
        <div className='flex items-center gap-3 ps-4 border-s border-gray-200'>
          <UserDropdown />
          <div className='hidden lg:flex flex-col'>
            <div className='flex items-center gap-1 cursor-pointer '>
              <span className='text-[14px] font-semibold leading-tight  text-[#fff]'>EasyRent Admin</span>
              <i className='ri-arrow-down-s-line text-xs text-textDisabled' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarContent