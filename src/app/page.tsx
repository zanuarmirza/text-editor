import Editor from '../editor/Editor'
import Toolbar from '../editor/Toolbar'

export default function Home() {
  return (
    <div className="flex flex-col container mx-auto h-screen px-4 md:px-0">
      <h1 className="text-3xl font-bold mt-8">Markdown editor</h1>
      <div className="flex flex-col h-full pb-8">
        <Toolbar />
        <Editor />
      </div>
    </div>
  )
}
