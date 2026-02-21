import './globals.css'
import type { Metadata } from 'next'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Kodbank',
  description: 'Premium fintech banking experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
