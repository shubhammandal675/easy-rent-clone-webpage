'use client'

import React, { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { Box, IconButton, Divider } from '@mui/material'

const Editor = ({ content, onChange }) => {
  // Ref to track if we are programmatically updating content
  const isFirstRender = useRef(true)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // Sirf tabhi onChange bhejo jab content sach mein badla ho
      if (html !== content) {
        onChange(html)
      }
    },
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none',
        spellcheck: 'false', 
      },
    },
  })

  // FIX: Prevent Infinite Loop
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // isFirstRender check zaroori hai taaki baar-baar setContent na ho
      if (isFirstRender.current) {
        editor.commands.setContent(content, false)
        isFirstRender.current = false
      }
    }
  }, [content, editor])

  if (!editor) return null

  const getIconColor = (type, options = {}) => 
    editor.isActive(type, options) ? '#00cfd5' : '#666'

  return (
    <Box sx={{ border: '1px solid #ced4da', borderRadius: '12px', overflow: 'hidden', mt: 1.5, bgcolor: '#fff' }}>
      <Box sx={{ p: 1, backgroundColor: '#fafbfd', borderBottom: '1px solid #ced4da', display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        <IconButton size="small" onClick={() => editor.chain().focus().undo().run()}><i className="ri-arrow-go-back-line" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().redo().run()}><i className="ri-arrow-go-forward-line" /></IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        <IconButton size="small" onClick={() => editor.chain().focus().toggleBold().run()} sx={{ color: getIconColor('bold') }}><i className="ri-bold" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleItalic().run()} sx={{ color: getIconColor('italic') }}><i className="ri-italic" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleUnderline().run()} sx={{ color: getIconColor('underline') }}><i className="ri-underline" /></IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('left').run()} sx={{ color: getIconColor({ textAlign: 'left' }) }}><i className="ri-align-left" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('center').run()} sx={{ color: getIconColor({ textAlign: 'center' }) }}><i className="ri-align-center" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('right').run()} sx={{ color: getIconColor({ textAlign: 'right' }) }}><i className="ri-align-right" /></IconButton>
        <IconButton size="small" onClick={() => editor.commands.clearContent()} sx={{ color: '#ff4d49', ml: 'auto' }}><i className="ri-delete-bin-line" /></IconButton>
      </Box>

      <Box sx={{ p: 4, minHeight: '350px', '& .ProseMirror': { outline: 'none', minHeight: '300px' } }}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}

export default Editor