'use client'
import { Card, CardHeader, CardContent, Chip, Button, Select, MenuItem, Typography, Box } from '@mui/material'

const outfitFont = { fontFamily: 'Outfit, Outfit Fallback, sans-serif' }

const TopCategories = ({ categories = [], onAdd, onRemove, onSave, loading }) => {
  const options = ['Electronics_test1', 'Bakeware', 'Cutlery', 'Table Accessories', 'Dinnerware', 'Macbook Pro']
  
  // Filter options: jo add ho chuke hain wo list mein na dikhein
  const filteredOptions = options.filter(opt => !categories.find(c => c.name === opt))

  return (
    <Card sx={{ mb: 6, ...outfitFont }}>
      <CardHeader
        title={<Typography variant="h6" sx={{ ...outfitFont, fontWeight: 600 }}>Top 10 Categories</Typography>}
        subheader={<Typography variant="body2" sx={outfitFont}>You can select up to 10 categories</Typography>}
        action={
          <Select
            value=""
            displayEmpty
            size='small'
            sx={{ minWidth: 200, ...outfitFont }}
            onChange={(e) => onAdd(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="" disabled sx={outfitFont}>Select Category</MenuItem>
            {filteredOptions.map(opt => (
              <MenuItem key={opt} value={opt} sx={outfitFont}>{opt}</MenuItem>
            ))}
          </Select>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {categories.map(cat => (
            <Chip
              key={cat.id}
              label={cat.name}
              deleteIcon={<i className='ri-close-line ' style={{ fontSize: '18px' , color:'#FF4C51' }} />}
              onDelete={() => onRemove(cat.id)}
              variant='filled'
              sx={{
                ...outfitFont,
                backgroundColor: '#f3f4f6',
                color: '#4b5563',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
        <div className='flex justify-end'>
          <Button 
            variant='contained' 
            onClick={onSave}
            disabled={loading}
            sx={{ 
              backgroundColor: '#22a6b3', 
              ...outfitFont,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#1b858f' }
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default TopCategories