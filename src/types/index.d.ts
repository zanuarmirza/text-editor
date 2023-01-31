import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import { blockCommands } from '@/editor/commands'
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: typeof blockCommands.paragraph
  children: CustomText[]
}

export type HeadingElement = {
  type: typeof blockCommands.heading
  children: CustomText[]
}

export type QuoteElement = {
  type: typeof blockCommands.quote
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement | QuoteElement

export type FormattedText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
  strikethrough?: true
  code?: true
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
