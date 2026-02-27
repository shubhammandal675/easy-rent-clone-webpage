import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const VendorReport = ({ data }) => (
    <TableContainer>
        <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                    {['ID', 'Vendor Name', 'Earnings', 'Fulfillment', 'Cancellation', 'Disputes', 'SLA'].map(h => (
                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{h}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx} hover>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.col3}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>₹15,000</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>95%</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>2%</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>0</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Maintained</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

export default VendorReport