import 'bootstrap/dist/css/bootstrap.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from './head'
import { GlobalProvider } from './GlobalProvider'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="https://kit.fontawesome.com/61a3926767.js"></Script>
      </body>
    </html>
  )
}
