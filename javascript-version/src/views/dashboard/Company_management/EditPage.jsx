'use client'
import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, Stack, Snackbar, Alert } from '@mui/material'
import Step1 from './AddStepsPage/Step1PersonalInfo'
import Step2 from './AddStepsPage/Step2CompanyDetails'
import Step3 from './AddStepsPage/Step3CompanyAddress'
import Step4 from './AddStepsPage/Step4DeliveryDetails'
import Step5 from './AddStepsPage/Step5Verification'

const steps = ['Personal Info', 'Company Details', 'Company Address', 'Delivery Details', 'Business Verification']

const EditPage = ({ data, onBack }) => {
  // 1. Initial Step Logic (Refresh Persistence)
  const [activeStep, setActiveStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStep = sessionStorage.getItem('edit_step_index');
      return savedStep ? parseInt(savedStep) : 0;
    }
    return 0;
  });

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

  // 2. Initial Data Logic: Props wala data tabhi use hoga jab storage khali ho
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('edit_company_data');
      if (saved) return JSON.parse(saved);
    }

    // Mapping dummy data if no session data exists
    const nameParts = data?.name ? data.name.split(' ') : ['', ''];
    return {
      ...data,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      contactNumber: data?.number || '',
      companyName: data?.name || '',
      isDelivering: data?.isDelivering || 'no'
    };
  });

  // Manual save function
  const saveToStorage = (stepIndex) => {
    sessionStorage.setItem('edit_company_data', JSON.stringify(formData));
    sessionStorage.setItem('edit_step_index', stepIndex.toString());
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    saveToStorage(nextStep);
    setActiveStep(nextStep);
  }

  const handleBack = () => {
    const prevStep = activeStep - 1;
    saveToStorage(prevStep);
    setActiveStep(prevStep);
  }

  // Clickable Stepper Logic
  const handleStepClick = (index) => {
    saveToStorage(index);
    setActiveStep(index);
  }

  const handleExit = () => {
    sessionStorage.removeItem('edit_company_data');
    sessionStorage.removeItem('edit_step_index');
    onBack();
  }

  const handleUpdate = () => {
    console.log("Updating Data:", formData);
    setNotification({ open: true, message: 'Company Updated Successfully!', severity: 'success' });
    
    // Clear storage on success
    sessionStorage.removeItem('edit_company_data');
    sessionStorage.removeItem('edit_step_index');
    setTimeout(onBack, 1500);
  }

  const StepIcon = (props) => {
    const { active, completed, icon } = props
    return (
      <Box sx={{
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active || completed ? '#00cfd5' : '#eee',
        color: active || completed ? '#fff' : '#888',
        fontWeight: 700, fontSize: '0.8rem'
      }}>{icon}</Box>
    )
  }

  const commonProps = { formData, setFormData, mode: 'edit' };

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={() => setNotification({ ...notification, open: false })} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={notification.severity} sx={{ borderRadius: '10px', backgroundColor:"white", border: '1px solid #eee'}}>
          {notification.message}
        </Alert>
      </Snackbar>
 
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '15px', border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Edit Company</Typography>
          <Button variant="outlined" onClick={handleExit} sx={{ color: '#00cfd5', borderColor: '#00cfd5', textTransform: 'none', borderRadius: '8px' }}>
            Back
          </Button>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{
          mb: 8,
          '& .MuiStepConnector-line': { borderColor: '#eee', borderTopWidth: 2 },
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': { borderColor: '#00cfd5' },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': { borderColor: '#00cfd5' },
        }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                StepIconComponent={StepIcon}
                onClick={() => handleStepClick(index)}
                sx={{ cursor: 'pointer', '& .MuiStepLabel-label': { cursor: 'pointer' } }}
              >
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '325px', mb: 8 }}>
          {activeStep === 0 && <Step1 {...commonProps} />}
          {activeStep === 1 && <Step2 {...commonProps} />}
          {activeStep === 2 && <Step3 {...commonProps} />}
          {activeStep === 3 && <Step4 {...commonProps} />}
          {activeStep === 4 && <Step5 {...commonProps} />}
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack} 
            sx={{ border: "1px solid #00cfd5", color: '#666', textTransform: 'none', px: 4, borderRadius: '8px' }}
          >
            Previous
          </Button>
          <Button 
            variant="contained" 
            onClick={activeStep === steps.length - 1 ? handleUpdate : handleNext} 
            sx={{ backgroundColor: '#00cfd5', px: 6, borderRadius: '8px', '&:hover': { backgroundColor: '#00b8bc' } }}
          >
            {activeStep === steps.length - 1 ? 'Update Company' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default EditPage;