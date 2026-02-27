import React from 'react'
import { Stack, TextField, InputAdornment, MenuItem, Button } from '@mui/material'

const ReportFilters = ({ statusValue, onStatusChange, onReset }) => (
    <Stack direction="row" spacing={2} sx={{ p: 2.5 }} flexWrap="wrap">
        <TextField
            size="small"
            placeholder="Search by name or email"
            sx={{ width: 260 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
        />
        <TextField size="small" type="date" sx={{ width: 200 }} />

        <TextField
            select
            size="small"
            value={statusValue}
            onChange={onStatusChange}
            sx={{ width: 150 }}
        >
            <MenuItem value="Select Status">Select Status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
            <MenuItem value="Active Rentals">Active Rentals</MenuItem>
        </TextField>

        <Button
            variant="text"
            onClick={onReset}
            sx={{ color: '#333', fontWeight: 700, textTransform: 'none' }}
        >
            Reset
        </Button>
    </Stack>
)

export default ReportFilters