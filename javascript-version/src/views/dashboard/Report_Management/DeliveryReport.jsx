import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const DeliveryReport = ({ data }) => (
    <TableContainer>
        <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                    {['ID', 'Partner', 'Total Orders', 'Avg Time', 'Success', 'Failed', 'Cancel', 'Offline'].map(h => (
                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{h}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx} hover>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.col5}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>150</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>42 min</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>98%</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>2</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>1</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>No</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

export default DeliveryReport