'use client'

import { useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, RenderLeafProps, Slate, withReact } from 'slate-react'
import keyEvent from './key-event'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'type here to start your awesome text editor' }],
  },
]
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = (
      <code className="text-red-500 bg-gray-800 rounded-sm px-1 py-0.5 text-sm">
        {children}
      </code>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}
const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <div className="flex mt-4 shadow-lg h-full px-8 py-8 overflow-auto rounded-lg bg-white">
      <Slate
        editor={editor}
        value={initialValue}
        // onChange={(value) => console.log(value)}
      >
        <Editable
          className="h-full w-full"
          renderLeaf={Leaf}
          onKeyDown={(event) => keyEvent(event, editor)}
        />
      </Slate>
    </div>
  )
}
export default Editor
