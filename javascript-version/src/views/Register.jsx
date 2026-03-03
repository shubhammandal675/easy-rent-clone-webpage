'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// MUI Imports
import { Grid, Box, Typography, TextField, IconButton, InputAdornment, Checkbox, Button, FormControlLabel } from '@mui/material'

// Third-party Imports
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

// Component Imports
import Logo from '@components/layout/shared/Logo'

const Register = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({}) // For field-specific errors
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  // Hooks
  const router = useRouter()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    let tempErrors = {}
    if (!formData.firstName) tempErrors.firstName = "First name is required"
    if (!formData.lastName) tempErrors.lastName = "Last name is required"
    if (!formData.email) {
      tempErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      tempErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // --- API CALL TO BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true 
      })

      if (response.status === 201) {
        toast.success("Admin Registered Successfully! 🚀")
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed!"
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
          
    

          <Typography variant='h4' className='mbe-1 font-bold' sx={{ color: '#1a1a1a' }}>Sign Up</Typography>
          <Typography className='mbe-6 text-textSecondary'>Enter your email and password to sign up!</Typography>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Box className='flex gap-4'>
              <TextField 
                fullWidth label='First Name*' name='firstName'
                placeholder='Enter your first name' 
                value={formData.firstName} 
                onChange={handleInputChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
              <TextField 
                fullWidth label='Last Name*' name='lastName'
                placeholder='Enter your last name' 
                value={formData.lastName} 
                onChange={handleInputChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Box>
            
            <TextField 
              fullWidth label='Email*' name='email'
              placeholder='example@gmail.com' 
              value={formData.email} 
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            
            <TextField
              fullWidth
              label='Password*'
              name='password'
              type={isPasswordShown ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' onClick={handleClickShowPassword}>
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <FormControlLabel
              className='mbe-2'
              control={<Checkbox size='small' defaultChecked />}
              label={
                <Typography variant='body2'>
                  By creating an account means you agree to the <strong>Terms and Conditions</strong>, and our <strong>Privacy Policy</strong>
                </Typography>
              }
            />

            <Button 
              fullWidth variant='contained' type='submit' size='large'
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
              {loading ? 'Registering...' : 'Sign Up'}
            </Button>

            <div className='flex justify-center items-center flex-wrap gap-1 mt-2'>
              <Typography variant='body2'>Already have an account?</Typography>
              <Typography component={Link} href='/login' variant='body2' className='font-bold text-primary'>
                Sign In
              </Typography>
            </div>
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


export default Register