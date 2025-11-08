import type { Metadata } from 'next'
import { inter } from '@/config/fonts';



import './globals.css';
import Provider from '../context/Provider';



export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
