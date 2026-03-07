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
  const [activeStep, setActiveStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStep = sessionStorage.getItem('temp_step_index');
      return savedStep ? parseInt(savedStep) : 0;
    }
    return 0;
  });

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('temp_company_data');
      return saved ? JSON.parse(saved) : {
        firstName: '', lastName: '', email: '', contactNumber: '',
        companyName: '', businessType: '', regNumber: '',
        currency: '', language: '',
        deliveryDays: [], radius: 0, isDelivering: 'no'
      };
    }
  });

  // New State for Errors
  const [errors, setErrors] = useState({});

  // Validation Logic
 const validateStep = () => {
    let tempErrors = {};
    
    // Step 1: Personal Info
    if (activeStep === 0) {
      if (!formData.firstName?.trim()) tempErrors.firstName = "First name is required";
      if (!formData.lastName?.trim()) tempErrors.lastName = "Last name is required";
      if (!formData.email?.trim()) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email is invalid";
      }
      if (!formData.contactNumber?.trim()) tempErrors.contactNumber = "Contact number is required";
      if (!formData.currency) tempErrors.currency = "Select a currency";
      if (!formData.language) tempErrors.language = "Select a language";
    }

    // Step 2: Company Details
    if (activeStep === 1) {
      if (!formData.companyName?.trim()) tempErrors.companyName = "Company name is required";
      if (!formData.businessType?.trim()) tempErrors.businessType = "Business type is required";
      if (!formData.regNumber?.trim()) tempErrors.regNumber = "Registration number is required";
      if (!formData.regDate) tempErrors.regDate = "Registration date is required";
    }

    // Step 3: Company Address
    if (activeStep === 2) {
      if (!formData.addressLine1?.trim()) tempErrors.addressLine1 = "Address is required";
      if (!formData.city?.trim()) tempErrors.city = "City is required";
      if (!formData.state?.trim()) tempErrors.state = "State is required";
      if (!formData.postalCode?.trim()) tempErrors.postalCode = "Postal code is required";
      if (!formData.warehouseAddress?.trim()) tempErrors.warehouseAddress = "Warehouse address is required";
      if (!formData.warehouseCity?.trim()) tempErrors.warehouseCity = "Warehouse City is required";
      if (!formData.warehouseState?.trim()) tempErrors.warehouseState = "Warehouse State is required";
      if (!formData.warehousePostalCode?.trim()) tempErrors.warehousePostalCode = "Warehouse Postal Code is required";
    }

    // Step 4: Delivery Details
    if (activeStep === 3 && formData.isDelivering === 'yes') {
      if (!formData.deliveryDays || formData.deliveryDays.length === 0) tempErrors.deliveryDays = "Select at least one day";
      if (!formData.startTime) tempErrors.startTime = "Start time is required";
      if (!formData.endTime) tempErrors.endTime = "End time is required";
      if (!formData.leadTime?.trim()) tempErrors.leadTime = "Lead time is required";
    }

    // Step 5: Verification
    if (activeStep === 4) {
      if (!formData.regCertificate) tempErrors.regCertificate = "Certificate is required";
      if (!formData.taxCertificate) tempErrors.taxCertificate = "Tax certificate is required";
      if (!formData.issuingAuthority?.trim()) tempErrors.issuingAuthority = "Authority is required";
      if (!formData.taxIdNumber?.trim()) tempErrors.taxIdNumber = "Tax ID is required";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveToStorage = (stepIndex) => {
    sessionStorage.setItem('temp_company_data', JSON.stringify(formData));
    sessionStorage.setItem('temp_step_index', stepIndex.toString());
  };

  const handleNext = () => {
    if (validateStep()) {
      const nextStep = activeStep + 1;
      saveToStorage(nextStep);
      setActiveStep(nextStep);
    }
  }

  const handleBack = () => {
    const prevStep = activeStep - 1;
    saveToStorage(prevStep);
    setActiveStep(prevStep);
    setErrors({}); // Back jane par errors clear kar do
  }

  const handleStepClick = (index) => {
    if (index > activeStep) {
      if (validateStep()) {
        saveToStorage(index);
        setActiveStep(index);
      }
    } else {
      saveToStorage(index);
      setActiveStep(index);
      setErrors({});
    }
  }

  const handleExit = () => {
    sessionStorage.removeItem('temp_company_data');
    sessionStorage.removeItem('temp_step_index');
    onBack();
  }

  const handleAddSubmit = () => {
    if (validateStep()) {
      console.log("Final Submission:", formData);
      sessionStorage.removeItem('temp_company_data');
      sessionStorage.removeItem('temp_step_index');
      onBack();
    }
  }

  const StepIcon = (props) => {
    const { active, completed, icon } = props
    return (
      <Box sx={{
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active || completed ? '#00cfd5' : '#eee',
        color: active || completed ? '#fff' : '#888',
        fontWeight: 700, fontSize: '0.8rem',
      }}>{icon}</Box>
    )
  }

  const renderStepContent = (step) => {
    // FIX: setErrors yahan pass kiya gaya hai commonProps mein
    const commonProps = { formData, setFormData, errors, setErrors, mode: 'add' };
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
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '15px', border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Add Company</Typography>
          <Button variant="outlined" onClick={handleExit} sx={{ color: '#00cfd5', borderColor: '#00cfd5', borderRadius: '8px' }}>Back</Button>
        </Box>

        {/* --- CLICKABLE STEPPER --- */}
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
          {renderStepContent(activeStep)}
        </Box>

        <Stack direction="row" justifyContent="space-between" >
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ border: "1px solid #00cfd5", color: '#666', borderRadius: '8px', px: 4 }}>Previous</Button>
          <Button 
            variant="contained" 
            onClick={activeStep === steps.length - 1 ? handleAddSubmit : handleNext}
            sx={{ backgroundColor: '#00cfd5', px: 6, borderRadius: '8px' }}
          >
            {activeStep === steps.length - 1 ? 'Add Company' : 'Next'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
export default AddPage;