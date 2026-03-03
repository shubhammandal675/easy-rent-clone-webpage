'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, Stack } from '@mui/material'
import Step1 from './AddStepsPage/Step1PersonalInfo'
import Step2 from './AddStepsPage/Step2CompanyDetails'
import Step3 from './AddStepsPage/Step3CompanyAddress'
import Step4 from './AddStepsPage/Step4DeliveryDetails'
import Step5 from './AddStepsPage/Step5Verification'

const steps = ['Personal Info', 'Company Details', 'Company Address', 'Delivery Details', 'Business Verification']

const AddPage = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0)

  // FIX 1: Add page ke liye hamesha naya empty data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    companyName: '',
    businessType: '',
    regNumber: '',
    currency: 'INR',
    language: 'English',
    deliveryDays: [],
    radius: 0,
    isDelivering: 'no'
  })

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  // Step Icon design logic
  const StepIcon = (props) => {
    const { active, completed, icon } = props
    return (
      <Box sx={{
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active || completed ? '#00cfd5' : '#eee',
        color: active || completed ? '#fff' : '#888',
        fontWeight: 700, fontSize: '0.8rem'
      }}>
        {icon}
      </Box>
    )
  }

  // FIX 2: Steps ko props pass karna bahut zaroori hai (formData, setFormData, mode)
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

  // Final submit handler
  const handleAddSubmit = () => {
    console.log("Saving New Company Data:", formData);
    // Yahan Future mein API call aayega: axios.post('/api/company', formData)
    onBack(); // Wapas list par jaane ke liye
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '15px', border: '1px solid #eee' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Add Company</Typography>
          <Button 
            variant="outlined" 
            onClick={onBack} 
            sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '8px' }}
          >
            Back
          </Button>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 8 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Content Area */}
        <Box sx={{ minHeight: '325px', mb: 8 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons */}
        <Stack direction="row" justifyContent="space-between" >
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack} 
            sx={{ border: "1px solid #00cfd5", color: '#666', textTransform: 'none', px: 4 }}
          >
            Previous
          </Button>
          
          <Button 
            variant="contained" 
            onClick={activeStep === steps.length - 1 ? handleAddSubmit : handleNext} 
            sx={{ 
                backgroundColor: '#00cfd5', 
                px: 6, 
                textTransform: 'none',
                '&:hover': { backgroundColor: '#00b8bc' } 
            }}
          >
            {activeStep === steps.length - 1 ? 'Add Company' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default AddPage