import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viral YouTube Shorts Agent',
  description: 'AI-powered viral YouTube Shorts content generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
