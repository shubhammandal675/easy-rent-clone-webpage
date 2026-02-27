import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const CustomerReport = ({ data }) => (
    <TableContainer>
        <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                    {['ID', 'Name', 'Email', 'Total Spent', 'Orders', 'Joined', 'Location', 'Status'].map(h => (
                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{h}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx} hover>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.col3}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.col3.toLowerCase()}@example.com</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>₹4,500</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>3</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>Jan 2024</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.col6}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem',  fontWeight: 600 }}>Active</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

export default CustomerReport