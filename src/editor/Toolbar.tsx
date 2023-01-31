'use client'

import { FormattedText } from '@/types'
import clsx from 'clsx'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'
import { toggleMark, isMarkActive } from './commands'

export interface ActionEditorMark {
  shortcutInfo?: string
  name: keyof Omit<FormattedText, 'text'>
  materialIcon?: string
  type: 'mark'
}

export interface ActionEditorBlock {
  shortcutInfo?: string
  name: string
  materialIcon?: string
  type: 'block'
}
export type ActionEditor = ActionEditorBlock | ActionEditorMark
const listAction: ActionEditor[] = [
  {
    name: 'bold',
    materialIcon: 'format_bold',
    type: 'mark',
  },

  {
    name: 'italic',
    materialIcon: 'format_italic',
    type: 'mark',
  },

  {
    name: 'code',
    materialIcon: 'code',
    type: 'mark',
  },

  {
    name: 'strikethrough',
    materialIcon: 'strikethrough_s',
    type: 'mark',
  },
  {
    name: 'underline',
    materialIcon: 'format_underlined',
    type: 'mark',
  },
]

const Toolbar = () => {
  const editor = useSlate()
  if (!Editor.marks(editor)) {
    return null
  }
  const renderMark = () => {
    return listAction.map((item) => {
      if (item.type === 'mark') {
        return (
          <button
            key={item.name}
            className={clsx('btn', {
              'btn-outline': !isMarkActive(editor, item.name),
            })}
            onMouseDown={(e) => {
              // prevent focus to button
              e.preventDefault()
              toggleMark(editor, item.name)
            }}
          >
            <span className="material-symbols-outlined">
              {item.materialIcon}
            </span>
          </button>
        )
      } else {
        // return (
        //   <button
        //     key={item.name}
        //     className={clsx(isMarkActive(editor, item.name))}
        //   >
        //     <span className="material-symbols-outlined">
        //       {item.materialIcon}
        //     </span>
        //   </button>
        // )
      }
    })
  }
  return <div className="flex space-x-4">{renderMark()}</div>
}

export default Toolbar
