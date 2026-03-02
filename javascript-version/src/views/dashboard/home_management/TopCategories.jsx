'use client'
import { Card, CardContent, Chip, Button, Typography, Box, Autocomplete, TextField, InputAdornment } from '@mui/material'

const outfitFont = { fontFamily: 'Outfit, sans-serif' }

const TopCategories = ({ categories = [], onAdd, onRemove, onSave, loading }) => {
  
  const MASTER_LIST = ['Electronics_test1', 'Bakeware', 'Cutlery', 'Table Accessories', 'Dinnerware', 'Macbook Pro', 'Kitchenware', 'Furniture']

  return (
    <Card sx={{ mb: 6, ...outfitFont, boxShadow: '0px 4px 18px 0px rgba(47, 43, 61, 0.1)', borderRadius: '10px' }}>
      <Box sx={{ p: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4c4e64de', ...outfitFont }}>Top 10 Categories</Typography>
          <Typography variant="body2" sx={{ color: '#4c4e64ad', ...outfitFont }}>You can select up to 10 categories</Typography>
        </Box>


        <Autocomplete
          size="small"
          options={MASTER_LIST}
          openOnFocus 
          autoHighlight
          value={null}
          onChange={(event, newValue) => {
            if (newValue && !categories.find(c => c.name === newValue)) onAdd(newValue)
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Select Category" 
              sx={{ 
                minWidth: 220, 
                ...outfitFont,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&.Mui-focused fieldset': { borderColor: '#9155FD' } 
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#9155FD' }
              }}
            />
          )}
        />
      </Box>

      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {categories.map(cat => (
            <Chip
              key={cat.id}
              label={cat.name}
              onDelete={() => onRemove(cat.id)}
              deleteIcon={<i className='ri-close-line' style={{ color: '#ff4d49' }} />}
              sx={{ ...outfitFont, backgroundColor: '#F4F5FA', borderRadius: '6px', fontWeight: 500 }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant='contained' 
            onClick={onSave}
            sx={{ backgroundColor: '#26C6DA', textTransform: 'none', fontWeight: 600, px: 6, borderRadius: '8px', ...outfitFont }}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TopCategories