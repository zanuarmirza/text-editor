import { FormattedText } from '@/types'
import { BaseEditor, Editor, Element, Transforms } from 'slate'

export const blockCommands = {
  paragraph: 'paragraph',
  heading: 'heading',
  quote: 'quote',
} as const

export interface KeyPress {
  materialSymbol?: string
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
    key: 'b',
  },
  code: {
    ctrl: true,
    key: 'e',
  },
  italic: {
    ctrl: true,
    key: 'i',
  },
  strikethrough: {
    ctrl: true,
    key: 's',
    shift: true,
  },
  underline: {
    ctrl: true,
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

export const getBlockActive = (
  editor: BaseEditor,
  format: Array<keyof typeof blockCommands> | string[] = ['heading', 'quote']
) => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        return !Editor.isEditor(n) && Element.isElement(n) && n.type
          ? format.includes(n.type)
          : false
      },
    })
  )
  return match
}
export const isMarkActive = (
  editor: BaseEditor,
  format: keyof Omit<FormattedText, 'text'>
) => {
  const marks = Editor.marks(editor)
  return marks ? !!marks[format] : false
}

export const getMarkActive = (editor: BaseEditor) => {
  const marks = Editor.marks(editor)
  return marks
}

export const toggleBlock = (
  editor: BaseEditor,
  format: keyof typeof blockCommands
) => {
  const isActive = !!getBlockActive(editor, [format])
  const newProperties = {
    type: isActive ? blockCommands.paragraph : format,
  }
  Transforms.setNodes<Element>(editor, newProperties)
}

export const toggleMark = (
  editor: BaseEditor,
  format: keyof Omit<FormattedText, 'text'>
) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
