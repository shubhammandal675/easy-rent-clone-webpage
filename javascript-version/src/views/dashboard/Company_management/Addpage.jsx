'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, Stack } from '@mui/material'
import Step1 from './AddStepsPage/Step1PersonalInfo'
import Step2 from './AddStepsPage/Step2CompanyDetails'
import Step3 from './AddStepsPage/Step3CompanyAddress'
// import Step4 from './AddStepsPage/Step4DeliveryDetails'
// import Step5 from './AddStepsPage/Step5Verification'

const steps = ['Personal Info', 'Company Details', 'Company Address', 'Delivery Details', 'Business Verification']

const AddPage = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

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

  const renderStepContent = (step) => {
    switch (step) {
      case 0: return <Step1 />;
      case 1: return <Step2 />;
      case 2: return <Step3 />;
      // case 3: return <Step4 />;
      // case 4: return <Step5 />;
      default: return 'Unknown Step';
    }
  }

  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Add Company</Typography>
          <Button variant="outlined" onClick={onBack} sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none' }}>Back</Button>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 8 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '325px', mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ color: '#888', textTransform: 'none' }}>Previous</Button>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? onBack : handleNext} sx={{ backgroundColor: '#00cfd5', px: 6 }}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
export default AddPage