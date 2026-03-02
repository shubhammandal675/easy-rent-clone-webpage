'use client'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Toaster, toast } from 'react-hot-toast'
import TopCategories from './TopCategories'
import CategoryOrder from './CategoryOrder'

const HomeManagementView = () => {
  // Initial Dummy Data (API Friendly format)
  const [categories, setCategories] = useState([
    { id: '1', name: 'Electronics_test1' },
    { id: '2', name: 'Bakeware' },
    { id: '3', name: 'Cutlery' },
    { id: '4', name: 'Dinnerware' },
    { id: '5', name: 'Table Accessories' },
    { id: '6', name: 'Macbook Pro' }
  ])
  const [loading, setLoading] = useState(false)

  // 1. Add Logic: Jab Search box se select ho
  const handleAdd = (name) => {
    if (categories.length >= 10) return toast.error("Maximum 10 categories allowed")
    const newEntry = { id: Date.now().toString(), name }
    setCategories(prev => [...prev, newEntry])
    toast.success(`${name} added!`)
  }

  // 2. Remove Logic
  const handleRemove = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  // 3. Save Logic: Backend connect karne ke liye ready
  const handleSave = async () => {
    setLoading(true)
    try {
      console.log("Saving to DB:", categories) // Payload for your API
      await new Promise(res => setTimeout(res, 1000)) // Fake Delay for UI feel
      toast.success("Settings saved successfully! 🚀")
    } catch (err) {
      toast.error("Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Toaster position="top-right" />
      <Grid item xs={12}>
        <TopCategories 
          categories={categories} 
          onAdd={handleAdd} 
          onRemove={handleRemove} 
          onSave={handleSave}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryOrder 
          categories={categories} 
          onReorder={setCategories} 
          onRemove={handleRemove} 
          onSave={handleSave}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default HomeManagementView