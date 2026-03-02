'use client'
import { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, Typography, IconButton, Button, Box, Autocomplete, TextField } from '@mui/material'

const outfitFont = { fontFamily: 'Outfit, sans-serif' }

const SortableItem = ({ cat, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id })
  const style = {   
    transform: CSS.Transform.toString(transform),
    transition, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', border: '1px solid #DBDADE', borderRadius: '8px',
    backgroundColor: '#fff', marginBottom: '12px', zIndex: isDragging ? 10 : 1,
    boxShadow: isDragging ? '0 5px 15px rgba(0,0,0,0.1)' : 'none', ...outfitFont
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <div {...listeners} style={{ cursor: 'grab', display: 'flex', color: '#bcbbbe' }}>
          <i className='ri-drag-move-2-line' style={{ fontSize: '20px' }} />
        </div>
        <Typography sx={{ fontWeight: 500, color: '#4c4e64de' }}>{cat.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Typography sx={{ color: '#bcbbbe', fontSize: '0.875rem', fontWeight: 600 }}>#{index + 1}</Typography>
        <IconButton size='small' onClick={() => onRemove(cat.id)} sx={{ color: '#FF4D49' }}>
          <i className='ri-close-line' />
        </IconButton>
      </Box>
    </div>
  )
}

const CategoryOrder = ({ categories = [], onReorder, onRemove, onSave, loading }) => {
  const [filter, setFilter] = useState(null)

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(i => i.id === active.id)
      const newIndex = categories.findIndex(i => i.id === over.id)
      onReorder(arrayMove(categories, oldIndex, newIndex))
    }
  }

  const displayedItems = filter ? categories.filter(c => c.name === filter) : categories

  return (
    <Card sx={{ boxShadow: '0px 4px 18px 0px rgba(47, 43, 61, 0.1)', borderRadius: '10px', ...outfitFont }}>
      <Box sx={{ p: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4c4e64de' }}>Category Order</Typography>
          <Typography variant="body2" sx={{ color: '#4c4e64ad' }}>Search and reorder your selected categories</Typography>
        </Box>

        <Autocomplete
          size="small"
          options={categories.map(c => c.name)}
          openOnFocus
          value={filter}
          onChange={(e, val) => setFilter(val)}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Select Category" 
              sx={{ 
                minWidth: 220,
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
      <CardContent>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <Box sx={{ minHeight: '120px' }}>
              {displayedItems.map((cat) => (
                <SortableItem key={cat.id} cat={cat} index={categories.findIndex(c => c.id === cat.id)} onRemove={onRemove} />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button 
            variant='contained' 
            onClick={onSave} 
            sx={{ backgroundColor: '#26C6DA', textTransform: 'none', fontWeight: 600, px: 6, borderRadius: '8px' }}
          >
            Save Order
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CategoryOrder    