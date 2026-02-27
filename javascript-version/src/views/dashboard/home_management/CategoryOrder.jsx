'use client'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardHeader, CardContent, Typography, IconButton, Button, Box } from '@mui/material'

const outfitFont = { fontFamily: 'Outfit, Outfit Fallback, sans-serif' }

const SortableItem = ({ cat, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: cat.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    ...outfitFont
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className='flex items-center gap-4'>
        <div {...listeners} style={{ cursor: 'grab', display: 'flex' }}>
          <i className='ri-menu-line text-gray-400' />
        </div>
        <Typography variant='body1' fontWeight='500' sx={outfitFont}>
          {cat.name}
        </Typography>
      </div>
      <div className='flex items-center gap-4'>
        <Typography sx={{ color: '#22a6b3', fontWeight: 'bold', ...outfitFont }}>
          #{index + 1}
        </Typography>
        <IconButton size='small' color='error' onClick={() => onRemove(cat.id)}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
    </div>
  )
}

const CategoryOrder = ({ categories = [], onReorder, onRemove, onSave, loading }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = categories.findIndex(i => i.id === active.id)
      const newIndex = categories.findIndex(i => i.id === over.id)
      onReorder(arrayMove(categories, oldIndex, newIndex))
    }
  }

  return (
    <Card sx={outfitFont}>
      <CardHeader 
        title={<Typography variant="h6" sx={{...outfitFont, fontWeight: 600}}>Category Order</Typography>}
        subheader={<Typography variant="body2" sx={outfitFont}>Select categories and reorder them</Typography>}
      />
      <CardContent>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
            {categories.map((cat, index) => (
              <SortableItem key={cat.id} cat={cat} index={index} onRemove={onRemove} />
            ))}
          </SortableContext>
        </DndContext>
        <div className='flex justify-end mt-4'>
          <Button 
            variant='contained' 
            onClick={onSave}
            disabled={loading}
            sx={{ backgroundColor: '#22a6b3', ...outfitFont, textTransform: 'none' }}
          >
            {loading ? 'Saving...' : 'Save Order'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CategoryOrder