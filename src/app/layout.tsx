import { Inter } from '@next/font/google'
import './globals.css'
import clsx from 'clsx'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <body
        className={clsx(
          inter.variable,
          'bg-gradient-to-tr from-gray-300 to-gray-100'
        )}
      >
        {children}
      </body>
    </html>
  )
}
