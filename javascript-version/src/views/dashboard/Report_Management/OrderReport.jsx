import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const OrderReport = ({ data }) => (
    <TableContainer>
        <Table>
            <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                    {['ID', 'Product', 'Customer', 'Vendor', 'Partner', 'Location', 'Type', 'Status'].map(h => (
                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{h}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx} hover>
                        {Object.values(row).map((val, i) => (
                            <TableCell key={i} sx={{ fontSize: '0.8rem' }}>{val}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

export default OrderReport