'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, Stack } from '@mui/material'
import Step1 from './AddStepsPage/Step1PersonalInfo'
import Step2 from './AddStepsPage/Step2IdentityDetails'
import Step3 from './AddStepsPage/Step3PartnerAddress'
import Step4 from './AddStepsPage/Step4VehicleDetails' 
import Step5 from './AddStepsPage/Step5Review'        

// Exact match with your Screenshot Stepper
const steps = ['Personal Info', 'Identity Details', 'Address', 'Vehicle Details', 'Review']

const AddPage = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0)

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', contactNumber: '',
    regDate: '', businessType: '',
    addressLine1: '', city: '', state: '', country: '', postalCode: '',
    vehicleType: '', maxLoad: '', registrationNumber: '',
    currency: 'USD', language: 'English'
  })

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const StepIcon = (props) => {
    const { active, completed, icon } = props
    return (
      <Box sx={{
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active || completed ? '#00cfd5' : '#fff',
        color: active || completed ? '#fff' : '#888',
        border: active || completed ? 'none' : '1px solid #dfe3e8',
        fontWeight: 700, fontSize: '0.8rem'
      }}>
        {icon}
      </Box>
    )
  }

  const renderStepContent = (step) => {
    const commonProps = { formData, setFormData, mode: 'add' };
    switch (step) {
      case 0: return <Step1 {...commonProps} />;
      case 1: return <Step2 {...commonProps} />;
      case 2: return <Step3 {...commonProps} />;
      case 3: return <Step4 {...commonProps} />;
      case 4: return <Step5 {...commonProps} />;
      default: return 'Unknown Step';
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '15px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        {/* Header - Jaisa image mein hai */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a2228' }}>Add Delivery Partner</Typography>
          <Button variant="outlined" onClick={onBack} sx={{ color: '#00cfd5', borderColor: '#00cfd5', borderRadius: '8px', textTransform: 'none' }}>Back</Button>
        </Box>

        {/* Stepper - Exact 5 steps */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 8 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 600 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '273px', mb: 5 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Stack direction="row" justifyContent="space-between" sx={{ pt: 3, borderTop: '1px solid #eee' }}>
          <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ borderRadius: '8px', textTransform: 'none', px: 4, borderColor: '#00cfd5', color: '#00cfd5' }}>Previous</Button>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? onBack : handleNext} sx={{ backgroundColor: '#00cfd5', px: 5, borderRadius: '8px', textTransform: 'none', '&:hover': { backgroundColor: '#00b8bc' } }}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default AddPage