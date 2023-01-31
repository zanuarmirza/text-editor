import { FormattedText } from '@/types'
import { Editor } from 'slate'
import { ReactEditor } from 'slate-react'

export const blockCommands = {
  paragraph: 'paragraph',
  heading: 'heading',
  quote: 'quote',
} as const

export interface KeyPress {
  info?: string
  shift?: boolean
  ctrl?: boolean
  key: string
}

export const keyboardShortcut: Record<
  keyof Omit<FormattedText, 'text'>,
  KeyPress
> = {
  bold: {
    ctrl: true,
    info: 'ctrl+b',
    key: 'b',
  },
  code: {
    ctrl: true,
    info: 'ctrl+e',
    key: 'e',
  },
  italic: {
    ctrl: true,
    info: 'ctrl+i',
    key: 'i',
  },
  strikethrough: {
    ctrl: true,
    info: 'ctrl+shift+s',
    key: 's',
    shift: true,
  },
  underline: {
    ctrl: true,
    info: 'ctrl+u',
    key: 'u',
  },
}

export const mapKey: Record<string, keyof Omit<FormattedText, 'text'>> = {}
Object.keys(keyboardShortcut).forEach((key) => {
  const formatKey = key as keyof Omit<FormattedText, 'text'>
  mapKey[
    JSON.stringify({
      // TODO need hash key
      ctrl: !!keyboardShortcut[formatKey].ctrl,
      shift: !!keyboardShortcut[formatKey].shift,
      key: keyboardShortcut[formatKey].key,
    })
  ] = formatKey
})

const isMarkActive = (
  editor: ReactEditor,
  format: keyof Omit<FormattedText, 'text'>
) => {
  const marks = Editor.marks(editor)
  return marks ? !!marks[format] : false
}

export const toggleBlock = (
  editor: ReactEditor,
  format: keyof typeof blockCommands
) => {
  console.log(editor, format)
}

export const toggleMark = (
  editor: ReactEditor,
  format: keyof Omit<FormattedText, 'text'>
) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
    // console.log(editor.marks) // debug marks value
  }
}
