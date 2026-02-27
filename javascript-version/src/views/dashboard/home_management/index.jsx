'use client'

import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import TopCategories from './TopCategories'
import CategoryOrder from './CategoryOrder'

const outfitFont = { fontFamily: 'Outfit, Outfit Fallback, sans-serif' }

const HomeManagementView = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // 1. Fetch data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/home/categories')
        if (res.data.categories) setCategories(res.data.categories)
      } catch (err) {
        console.error("Fetch error:", err)
      }
    }
    fetchData()
  }, [])

  // 2. Logic: Add Category (Dropdown se)
  const handleAdd = (name) => {
    if (!name) return
    if (categories.length >= 10) {
      return toast.error("Maximum 10 categories allowed")
    }
    // Duplicate check
    if (categories.find(c => c.name === name)) {
      return toast.error("Already added!")
    }
    const newItem = { id: Date.now().toString(), name }
    setCategories(prev => [...prev, newItem])
  }

  // 3. Logic: Remove Category
  const handleRemove = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  // 4. Logic: Reorder
  const handleReorder = (newList) => {
    setCategories(newList)
  }

  // 5. Logic: Final Save to Backend
  const handleSaveAll = async () => {
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/home/update-categories', {
        categories: categories
      })
      toast.success("Settings saved successfully! 🚀")
    } catch (err) {
      toast.error("Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={6} sx={{ ...outfitFont }}>
      <Toaster position="top-right" />
      <Grid item xs={12}>
        <TopCategories 
          categories={categories} 
          onAdd={handleAdd} 
          onRemove={handleRemove} 
          onSave={handleSaveAll}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryOrder 
          categories={categories} 
          onReorder={handleReorder} 
          onRemove={handleRemove} 
          onSave={handleSaveAll}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default HomeManagementView