'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import { Grid, Box, Typography, TextField, IconButton, InputAdornment, Checkbox, Button, FormControlLabel } from '@mui/material'

// Third-party Imports
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

// Component Imports
import Logo from '@components/layout/shared/Logo'

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // --- ERROR STATE ---
  const [errors, setErrors] = useState({}) 

  // Hooks
  const router = useRouter()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    let tempErrors = {}
    if (!email) {
      tempErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email"
    }
    if (!password) {
      tempErrors.password = "Password is required"
    }
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // --- API CALL TO BACKEND ---
  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Pehle local validation check karein
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password }, 
        { withCredentials: true } 
      )

      if (response.status === 200) {
        toast.success("Welcome Back! 👋🏻")
        localStorage.setItem('userEmail', response.data.user.email)
        setTimeout(() => router.push('/'), 1500)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid credentials"
      
      // Backend error ko field ke niche dikhane ke liye
      if (errorMsg.toLowerCase().includes('email')) {
        setErrors({ email: errorMsg })
      } else if (errorMsg.toLowerCase().includes('password')) {
        setErrors({ password: errorMsg })
      } else {
        toast.error(errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container className='min-bs-[100dvh] bg-backgroundPaper'>
      <Toaster position="top-right" />
      
      <Grid item xs={12} md={6} className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <Box className='is-full max-is-[400px]'>
          
          <Typography variant='h4' className='mbe-1 font-bold'>Login</Typography>
          <Typography className='mbe-6 text-textSecondary'>Please sign-in to your account to continue</Typography>

          <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
            <TextField 
              autoFocus 
              fullWidth 
              size='small' 
              label='Email' 
              placeholder='admin@easyrent.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
              // --- ERROR PROPS ---
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            
            <TextField
              fullWidth
              size='small'
              label='Password'
              placeholder='········'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
              // --- ERROR PROPS ---
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' edge='end' onClick={handleClickShowPassword}>
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel 
                control={<Checkbox size='small' />} 
                label={<Typography variant='body2'>Remember me</Typography>} 
              />
              <Typography variant='body2' component={Link} href='/forgot-password' color='primary' className='font-medium'>
                Forgot password?
              </Typography>
            </div>

            <Button 
              fullWidth 
              variant='contained' 
              type='submit' 
              size='large'
              disabled={loading}
              sx={{ bgcolor: '#4c4e64', '&:hover': { bgcolor: '#3e4052' } }}
              className='py-2.5 font-bold normal-case'
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>

            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography variant='body2'>New on our platform?</Typography>
              <Typography component={Link} href='/register' variant='body2' color='primary' className='font-bold'>
                Create an account
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

export default Login