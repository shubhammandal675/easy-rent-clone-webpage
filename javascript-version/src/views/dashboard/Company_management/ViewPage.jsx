'use client'
import React from 'react'
import { Box, Typography, Button, Grid, Card, TextField, Avatar, Divider } from '@mui/material'

const ViewPage = ({ data, onBack }) => {
  return (
    <Box sx={{ p: 5, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Card sx={{ p: 5, borderRadius: '15px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Company Profile</Typography>
          <Button variant="contained" onClick={onBack} sx={{ backgroundColor: '#00cfd5' }}>Back</Button>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar sx={{ width: 100, height: 100, fontSize: '2rem', bgcolor: '#00cfd5' }}>{data?.name?.[0]}</Avatar>
            <Box>
              <Typography variant="h4">{data?.name}</Typography>
              <Typography color="textSecondary">{data?.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}><Typography variant="caption">Phone</Typography><Typography sx={{ fontWeight: 600 }}>{data?.number}</Typography></Grid>
          <Grid item xs={4}><Typography variant="caption">Status</Typography><Typography sx={{ fontWeight: 600 }}>{data?.status}</Typography></Grid>
          <Grid item xs={4}><Typography variant="caption">ID</Typography><Typography sx={{ fontWeight: 600 }}>#00{data?.id}</Typography></Grid>
        </Grid>
      </Card>
    </Box>
  )
}
export default ViewPage