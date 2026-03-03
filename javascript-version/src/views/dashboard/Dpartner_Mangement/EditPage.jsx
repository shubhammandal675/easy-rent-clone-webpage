'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Stepper, Step, StepLabel, Card, Stack, Snackbar, Alert } from '@mui/material'
import Step1 from './AddStepsPage/Step1PersonalInfo'
import Step2 from './AddStepsPage/Step2IdentityDetails'
import Step3 from './AddStepsPage/Step3PartnerAddress'
import Step4 from './AddStepsPage/Step4VehicleDetails'
import Step5 from './AddStepsPage/Step5Review'

const steps = ['Personal Info', 'Company Details', 'Company Address', 'Delivery Details', 'Business Verification']

const EditPage = ({ data, onBack }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

  // Mapping dummy/list data to form keys
  const [formData, setFormData] = useState(() => {
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

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleUpdate = () => {
    console.log("Updating Data:", formData);
    setNotification({ open: true, message: 'Company Updated Successfully!', severity: 'success' });
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
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={notification.severity} sx={{ borderRadius: '10px',  backgroundColor:"white"}}>{notification.message}</Alert>
      </Snackbar>
 
      <Card sx={{ p: 5, borderRadius: '15px', border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Edit Company</Typography>
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

        <Box sx={{ minHeight: '325px', mb: 8 }}>
          {activeStep === 0 && <Step1 {...commonProps} />}
          {activeStep === 1 && <Step2 {...commonProps} />}
          {activeStep === 2 && <Step3 {...commonProps} />}
          {activeStep === 3 && <Step4 {...commonProps} />}
          {activeStep === 4 && <Step5 {...commonProps} />}
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ border: "1px solid #00cfd5", color: '#666', textTransform: 'none', px: 4 }}>Previous</Button>
          <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleUpdate : handleNext} sx={{ backgroundColor: '#00cfd5', px: 6 }}>
            {activeStep === steps.length - 1 ? 'Update Company' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
export default EditPage;