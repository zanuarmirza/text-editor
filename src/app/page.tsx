import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../editor/Editor'), { ssr: false })

export default function Home() {
  return (
    <div className="flex flex-col container mx-auto h-screen px-4 md:px-0">
      <h1 className="text-3xl font-bold mt-12 mb-4">
        {`Markdown editor`.toUpperCase()}
      </h1>
      <div className="flex flex-col h-full pb-8">
        <Editor />
      </div>
    </div>
  )
}
