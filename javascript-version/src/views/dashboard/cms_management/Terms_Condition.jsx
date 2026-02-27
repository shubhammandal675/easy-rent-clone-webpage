'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, Typography, Box, Button, Skeleton, Stack } from '@mui/material'

// SSR safe dynamic import
const Editor = dynamic(() => import('./Editor'), { 
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '12px', mt: 2 }} />
})

const Terms_Condition = () => {
    const [content, setContent] = useState({
        en: '',
        de: '',
        tr: ''
    })

    const handleUpdate = (lang, html) => {
        setContent(prev => ({ ...prev, [lang]: html }))
    }

    const handleSave = () => {
        console.log("Saving Data:", content)
        alert("Success: All languages updated!")
    }

    return (
        <Box sx={{ p: { xs: 2, md: 6 }, backgroundColor: '#f4f5fa', minHeight: '100vh' }}>
            
            {/* STICKY HEADER AREA */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 6, 
                // position: 'sticky', 
                top: '20px', 
                // zIndex: 1000,
                backgroundColor: 'rgba(244, 245, 250, 0.9)',
                backdropFilter: 'blur(8px)',
                pb: 2
            }}>
                <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#3a3541', fontFamily: "'Outfit', sans-serif" }}>
                    Terms & Conditions
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={handleSave}
                    sx={{ 
                        bgcolor: '#00cfd5', 
                        '&:hover': { bgcolor: '#00b8bc' }, 
                        textTransform: 'none', 
                        px: 8, 
                        py: 2.5,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 12px rgba(0, 207, 213, 0.3)',
                        fontWeight: 600
                    }}
                >
                    Save All Changes
                </Button>
            </Box>

            <Stack spacing={8}> 
                
                {/* --- ENGLISH SECTION --- */}
                <Card sx={{ p: 5, borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaeb' }}>
                    <Typography sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', display: 'flex', alignItems: 'center', color: '#5e5873' }}>
                        <Box component="span" sx={{ width: 4, height: 20, bgcolor: '#00cfd5', mr: 2, borderRadius: 1 }} />
                        Terms & Conditions (English)
                    </Typography>
                    <Editor content={content.en} onChange={(html) => handleUpdate('en', html)} />
                </Card>

                {/* --- GERMAN SECTION --- */}
                <Card sx={{ p: 5, borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaeb' }}>
                    <Typography sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', display: 'flex', alignItems: 'center', color: '#5e5873' }}>
                        <Box component="span" sx={{ width: 4, height: 20, bgcolor: '#00cfd5', mr: 2, borderRadius: 1 }} />
                        Terms & Conditions (German)
                    </Typography>
                    <Editor content={content.de} onChange={(html) => handleUpdate('de', html)} />
                </Card>

                {/* --- TURKISH SECTION --- */}
                <Card sx={{ p: 5, borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaeb' }}>
                    <Typography sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', display: 'flex', alignItems: 'center', color: '#5e5873' }}>
                        <Box component="span" sx={{ width: 4, height: 20, bgcolor: '#00cfd5', mr: 2, borderRadius: 1 }} />
                        Terms & Conditions (Turkish)
                    </Typography>
                    <Editor content={content.tr} onChange={(html) => handleUpdate('tr', html)} />
                </Card>

            </Stack>
        </Box>
    )
}

export default Terms_Condition                               