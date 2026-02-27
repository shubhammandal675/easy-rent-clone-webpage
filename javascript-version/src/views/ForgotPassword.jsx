'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import { Grid, Box, Typography, TextField, Button } from '@mui/material'

// Third-party Imports
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import DirectionalIcon from '@components/DirectionalIcon'

const ForgotPassword = () => {
  // States
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // --- API CALL TO BACKEND ---
  const handleResetRequest = async (e) => {
    e.preventDefault()
    
    if (!email) {
      return toast.error("Please enter your email address")
    }

    setLoading(true)
    try {
      // Backend route (e.g., /api/auth/forgot-password)
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email })
      
      if (response.status === 200) {
        toast.success("Reset link sent to your email! 📧")
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong!"
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container className='min-bs-[100dvh] bg-white'>
      <Toaster position="top-right" />
      
      {/* --- LEFT SECTION: FORM --- */}
      <Grid item xs={12} md={6} className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <Box className='is-full max-is-[450px]'>
          
          <div className='mbe-8 flex justify-center md:justify-start'>
            <Logo />
          </div>

          <Typography variant='h4' className='mbe-1 font-bold'>Forgot Password 🔒</Typography>
          <Typography className='mbe-6 text-textSecondary'>
            Enter your email and we&#39;ll send you instructions to reset your password
          </Typography>

          <form noValidate autoComplete='off' onSubmit={handleResetRequest} className='flex flex-col gap-5'>
            <TextField 
              autoFocus 
              fullWidth 
              label='Email' 
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button 
              fullWidth 
              variant='contained' 
              type='submit' 
              size='large'
              disabled={loading}
              sx={{ 
                bgcolor: '#2d2d2d', 
                '&:hover': { bgcolor: '#1a1a1a' },
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                borderRadius: '8px'
              }}
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>

            <Typography className='flex justify-center items-center' color='primary'>
              <Link href='/login' className='flex items-center font-bold'>
                <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                <span>Back to Login</span>
              </Link>
            </Typography>
          </form>
        </Box>
      </Grid>

  {/* --- RIGHT SECTION: BRANDING (Event Hero Style) --- */}
      <Grid 
        item xs={false} md={6} 
        className='hidden md:flex flex-col justify-center items-center bg-[#fff5eb] relative'
        sx={{
          backgroundImage: 'radial-gradient(#d1d1d1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      >
        <Box className='text-center p-10'>
          <Box 
            component='img' 
            src='/images/logos/navlogo.webp' 
            className='rounded-xl shadow-xl mbe-6'
            sx={{ 
                width: 320, 
                height: 320, 
                objectFit: 'cover',
                border: '1px solid #eee' 
            }}
          />
          <Typography variant='h5' className='font-bold' sx={{ color: '#333' }}>
            Easy Rent Admin Dashboard
          </Typography>
        </Box>
      </Grid>
      
    </Grid>
  )
}

export default ForgotPassword