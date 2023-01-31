import { KeyboardEvent } from 'react'
import { ReactEditor } from 'slate-react'
import { mapKey, toggleMark } from './commands'
const keyEvent = (
  event: KeyboardEvent<HTMLDivElement>,
  editor: ReactEditor
) => {
  const key = JSON.stringify({
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    key: event.key.toLocaleLowerCase(),
  })
  const format = mapKey[key]
  if (!format) return
  event.preventDefault()
  toggleMark(editor, format)
}
export default keyEvent
