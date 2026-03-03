'use client'

import React, { useState, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Card, Typography, Box, Button, Skeleton, Stack } from '@mui/material'

const Editor = dynamic(() => import('./Editor').then(mod => mod.default), { 
  ssr: false,
  loading: () => <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '12px', mt: 2 }} />
})

const Privacy_Policy = () => {
    const [content, setContent] = useState({ en: '', de: '', tr: '' })

    // FIX: useCallback use karein taaki Editor ko baar-baar naya function na mile
    const handleUpdate = useCallback((lang, html) => {
        setContent(prev => {
            // Sirf tabhi update karein jab content sach mein badla ho
            if (prev[lang] === html) return prev;
            return { ...prev, [lang]: html };
        });
    }, []);

    const handleSave = () => {
        console.log("Saving Data:", content)
        alert("Success: Saved!")
    }

    // Languages array ko memoize karein
    const languages = useMemo(() => [
        { id: 'en', label: 'English' },
        { id: 'de', label: 'German' },
        { id: 'tr', label: 'Turkish' }
    ], []);

    return (
        <Box sx={{ p: { xs: 2, md: 6 }, backgroundColor: '#f4f5fa', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>Privacy Policy</Typography>
                <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#00cfd5' }}>Save All</Button>
            </Box>

            <Stack spacing={6}>
                {languages.map((lang) => (
                    <Card key={lang.id} sx={{ p: 5, borderRadius: '16px' }}>
                        <Typography sx={{ fontWeight: 700, mb: 3 }}>{lang.label} Version</Typography>
                        {/* Editor ko uska specific content pass karein */}
                        <Editor 
                            content={content[lang.id]} 
                            onChange={(html) => handleUpdate(lang.id, html)} 
                        />
                    </Card>
                ))}
            </Stack>
        </Box>
    )
}

export default Privacy_Policy