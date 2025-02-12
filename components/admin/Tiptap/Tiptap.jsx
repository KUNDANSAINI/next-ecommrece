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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'

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
          <div className='h-full sm:pr-2 border-r-2'>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              <button onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().undo().run()
              }}
                disabled={!editor.can().undo()
                }>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconArrowBackUp
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Undo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().redo().run()
              }} disabled={!editor.can().redo()}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconArrowForwardUp
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Redo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run()
                }}
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconBold size={25}
                        className={editor.isActive('bold') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bold</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleUnderline().run()
                }}
                className={editor.isActive('underline') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconUnderline
                        size={25}
                        className={editor.isActive('underline') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Underline</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleItalic().run()
                }}
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconItalic
                        size={25}
                        className={editor.isActive('italic') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Italic</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleStrike().run()
                }}
                className={editor.isActive('strike') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconStrikethrough
                        size={25}
                        className={editor.isActive('strike') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Strike</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            </div>
          </div>

          {/* 2nd Column */}
          <div className='h-full sm:pr-3.5 border-r-2'>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setHardBreak().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconLine
                        stroke={2}
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Line Break</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleCode().run()
                }}
                className={editor.isActive('code') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconCode
                        size={25}
                        className={editor.isActive('code') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleHighlight().run()
                }}
                className={editor.isActive('highlight') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconHighlight
                        size={25}
                        className={editor.isActive('highlight') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Highlight</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setHorizontalRule().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconLayoutDistributeHorizontal
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Horizontal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleSubscript().run()
                }}
                className={editor.isActive('subscript') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconSubscript
                        size={25}
                        stroke={2}
                        className={editor.isActive('subscript') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Subscript</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleSuperscript().run()
                }}
                className={editor.isActive('superscript') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconSuperscript
                        size={25}
                        className={editor.isActive('superscript') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Superscript</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            </div>
          </div>

          {/* 3nd Column */}
          <div className='h-full sm:pr-3.5 border-r-2'>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleBulletList().run()
                }}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>

                      <IconList
                        stroke={2}
                        size={25}
                        className={editor.isActive('bulletList') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bullet List</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleOrderedList().run()
                }}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconListNumbers
                        size={25}
                        className={editor.isActive('orderedList') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ordered List</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleTaskList().run()
                }}
                className={editor.isActive('taskList') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconListCheck
                        size={25}
                        className={editor.isActive('taskList') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Task List</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleBlockquote().run()
                }}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconBlockquote
                        size={25}
                        className={editor.isActive('blockquote') ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Block Quote</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconH1
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Heading 1</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconH2
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Heading 2</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconH3
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Heading 3</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            </div>

          </div>

          {/* 4nd Column */}
          <div className='h-full sm:pr-3.5 border-r-2'>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().setTextAlign('left').run()
                }}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconAlignLeft
                        size={25}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text Left</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().setTextAlign('center').run()
                }}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconAlignCenter
                        size={25}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text Center</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().setTextAlign('right').run()
                }}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconAlignRight
                        size={25}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text Right</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  editor.chain().focus().setTextAlign('justify').run()
                }}
                className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconAlignJustified
                        size={25}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active rounded p-0.5 bg-blue-500' : ''}
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text Justify</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Input
                      type="color"
                      onInput={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setColor(event.target.value).run()
                      }}
                      value={editor.getAttributes('textStyle').color}
                      data-testid="setColor"
                      className='w-20 p-1'
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Text Color</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Table Buttons */}
          <div className='h-full sm:pr-3.5'>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconTablePlus
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Insert Table</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().deleteTable().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconTableMinus
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Table</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().addColumnBefore().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconColumnInsertLeft
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Column Left</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().addColumnAfter().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconColumnInsertRight
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Column Right</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().deleteColumn().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconColumnRemove
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Column Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().addRowBefore().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconRowInsertTop
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Row Top</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().addRowAfter().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconRowInsertBottom
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Row Bottom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>

              <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().deleteRow().run()
              }}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconRowRemove
                        size={30}
                        className='hover:bg-blue-500 rounded p-0.5'
                        stroke={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Row Remove</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            </div>
          </div>

        </div>
      </div>

      <EditorContent editor={editor} className='mt-4' />
    </>
  )
}
