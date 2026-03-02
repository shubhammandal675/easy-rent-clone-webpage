import React, { useState, useMemo } from 'react'
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton, TextField, MenuItem, Select, Button, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

const CustomerList = ({ customers, onAction, onDelete }) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const filteredData = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : (statusFilter === 'active' ? c.status === true : c.status === false);
      return matchesSearch && matchesStatus;
    })
  }, [search, statusFilter, customers])

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', p: 5 }}>
      <Card sx={{ borderRadius: "15px", p: 5, backgroundColor: '#fff' }}>
        
        {/* Header - Export/Import Buttons Added */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#000' }}>Customer Management</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Import</Button>
            <Button variant="contained" sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Export</Button>
            <Button variant="contained" onClick={() => onAction('add')} sx={{ backgroundColor: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Add Customer</Button>
          </Box>
        </Box>

        {/* Filters - Equalizer & Reset Buttons Added */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} 
            InputProps={{ startAdornment: <InputAdornment position="start"><i className="ri-search-line" /></InputAdornment> }}
            sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Select size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: 150, borderRadius: '8px' }}>
            <MenuItem value="all">Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <IconButton sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', '&:hover': { borderColor: '#ee9835ff' } }}>
            <i className="ri-equalizer-line" />
          </IconButton>
          <Button onClick={() => { setSearch(''); setStatusFilter('all'); }} sx={{ color: '#00cfd5', textTransform: 'none', fontWeight: 600 }}>Reset</Button>
        </Box>

        {/* Table - Toggle SVG exactly as your code */}
        <TableContainer sx={{ border: '1px solid #f0f0f0', borderRadius: '12px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fafafa' }}>
              <TableRow>
                {['ID', 'Image', 'Name', 'Email', 'Number', 'Status', 'Action'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 600, color: '#a0a0a0', fontSize: '0.75rem' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell><Box sx={{ width: 32, height: 32, backgroundColor: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#54a5d4ff' }}><i className="ri-user-fill" /></Box></TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>
                    <IconButton sx={{ p: 0, color: row.status ? '#00cfd5' : '#ccc' }}>
                      <svg width="34" height="20" viewBox="0 0 24 14" fill="none">
                        <rect width="24" height="14" rx="7" fill="currentColor" fillOpacity={row.status ? "1" : "0.3"} />
                        <circle cx={row.status ? 17 : 7} cy="7" r="5" fill={row.status ? "#fff" : "currentColor"} />
                      </svg>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, color: '#888' }}>
                      <IconButton size="small" onClick={() => onAction('view', row)}><i className="ri-eye-line" /></IconButton>
                      <IconButton size="small" onClick={() => onAction('edit', row)}><i className="ri-edit-box-line" /></IconButton>
                      <IconButton size="small" onClick={() => { setDeleteId(row.id); setOpenDelete(true); }}><i className="ri-delete-bin-line" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Delete Dialog - Exact Screenshot 13 design */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)} PaperProps={{ sx: { borderRadius: '15px', p: 1 } }}>
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>Delete Customer</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>Do you want to delete this customer?</DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
            <Button onClick={() => { onDelete(deleteId); setOpenDelete(false); }} variant="contained" sx={{ backgroundColor: '#00cfd5', px: 4 }}>Delete</Button>
            <Button onClick={() => setOpenDelete(false)} variant="outlined" sx={{ color: '#00cfd5', borderColor: '#00cfd5', px: 4 }}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  )
}
export default CustomerList