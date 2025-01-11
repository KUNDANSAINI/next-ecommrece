'use cliect'

import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight, IconArrowBackUp, IconArrowForwardUp, IconBlockquote, IconBold, IconCode, IconColumnInsertLeft, IconColumnInsertRight, IconColumnRemove, IconH1, IconH2, IconH3, IconHighlight, IconItalic, IconLayoutDistributeHorizontal, IconLine, IconList, IconListCheck, IconListNumbers, IconPhotoPlus, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconStrikethrough, IconSubscript, IconSuperscript, IconTableMinus, IconTablePlus, IconUnderline } from '@tabler/icons-react'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useCallback } from 'react'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import Bold from '@tiptap/extension-bold'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Italic from '@tiptap/extension-italic'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import HardBreak from '@tiptap/extension-hard-break'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Strike from '@tiptap/extension-strike'
import History from '@tiptap/extension-history'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Placeholder from '@tiptap/extension-placeholder'

export default ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Dropcursor,
      BulletList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList,
      Bold,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'table'],
      }),
      Italic,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Blockquote,
      HorizontalRule,
      HardBreak,
      Code,
      Highlight.configure({ multicolor: true }),
      Strike,
      History,
      TextStyle,
      Color,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Subscript,
      Superscript,
      Placeholder.configure({
        placeholder: 'Write Content...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  });


  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="flex flex-wrap gap-4 border rounded-md p-2 border-zinc-400">

          {/* 1st Column */}
          <div className='flex flex-wrap gap-4 sm:border-r-2 sm:pr-4'>
            <button onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run()
            }}
              disabled={!editor.can().undo()
              }>
              <IconArrowBackUp stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().redo().run()
            }} disabled={!editor.can().redo()}>
              <IconArrowForwardUp stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBold().run()
              }}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <IconBold stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleUnderline().run()
              }}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <IconUnderline stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleItalic().run()
              }}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <IconItalic stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleStrike().run()
              }}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <IconStrikethrough stroke={2} />
            </button>
          </div>

          {/* 2nd Column */}
          <div className='flex flex-wrap gap-4 sm:border-r-2 sm:pr-4'>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setHardBreak().run()
            }}><IconLine stroke={2} /></button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleCode().run()
              }}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              <IconCode stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleHighlight().run()
              }}
              className={editor.isActive('highlight') ? 'is-active' : ''}
            >
              <IconHighlight stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setHorizontalRule().run()
            }}>
              <IconLayoutDistributeHorizontal stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleSubscript().run()
              }}
              className={editor.isActive('subscript') ? 'is-active' : ''}
            >
              <IconSubscript stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleSuperscript().run()
              }}
              className={editor.isActive('superscript') ? 'is-active' : ''}
            >
              <IconSuperscript stroke={2} />
            </button>
          </div>

          {/* 3nd Column */}
          <div className='flex flex-wrap gap-4 sm:border-r-2 sm:pr-4'>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBulletList().run()
              }}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <IconList stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleOrderedList().run()
              }}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <IconListNumbers stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleTaskList().run()
              }}
              className={editor.isActive('taskList') ? 'is-active' : ''}
            >
              <IconListCheck stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBlockquote().run()
              }}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <IconBlockquote stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              <IconH1 stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              <IconH2 stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              <IconH3 stroke={2} />
            </button>

          </div>

          {/* 4nd Column */}
          <div className='flex flex-wrap gap-4 sm:pr-4'>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('left').run()
              }}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            >
              <IconAlignLeft stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('center').run()
              }}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            >
              <IconAlignCenter stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('right').run()
              }}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            >
              <IconAlignRight stroke={2} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('justify').run()
              }}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            >
              <IconAlignJustified stroke={2} />
            </button>
            <input
              type="color"
              onInput={(e) => {
                e.preventDefault()
                editor.chain().focus().setColor(event.target.value).run()
              }}
              value={editor.getAttributes('textStyle').color}
              data-testid="setColor"
            />
          </div>

          {/* Table Buttons */}
          <div className='flex flex-wrap gap-4 sm:border-r-2 sm:pr-4'>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()
            }}>
              <IconTablePlus stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteTable().run()
            }}>
              <IconTableMinus stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().addColumnBefore().run()
            }}>
              <IconColumnInsertLeft stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().addColumnAfter().run()
            }}>
              <IconColumnInsertRight stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteColumn().run()
            }}>
              <IconColumnRemove stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().addRowBefore().run()
            }}>
              <IconRowInsertTop stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().addRowAfter().run()
            }}>
              <IconRowInsertBottom stroke={2} />
            </button>
            <button onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteRow().run()
            }}>
              <IconRowRemove stroke={2} />
            </button>
          </div>

        </div>
      </div>

      <EditorContent editor={editor} className='mt-4' />
    </>
  )
}
