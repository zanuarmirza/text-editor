'use client'

import { useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, RenderLeafProps, Slate, withReact } from 'slate-react'
import keyEvent from './key-event'
import Toolbar from './Toolbar'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'type here to start your awesome text editor' }],
  },
]
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  // TODO should be more safe when using match pattern rust like
  /// suchipi/safety-match
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
    <Slate
      editor={Object.assign(editor, { id: '1' })} // issue next.js 13
      value={initialValue}
      // onChange={(value) => console.log(value)}
    >
      <Toolbar></Toolbar>
      <div className="flex mt-4 shadow-lg h-full px-8 py-8 overflow-auto rounded-lg bg-white">
        <Editable
          autoFocus
          className="h-full w-full"
          renderLeaf={Leaf}
          onKeyDown={(event) => keyEvent(event, editor)}
        />
      </div>
    </Slate>
  )
}
export default Editor
