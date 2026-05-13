import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'Watch Design Self-Study Programme',
  description: 'A graduate-level self-study curriculum in watch design — from anatomy and brand strategy through CAD, materials, rendering, and launch.',
  keywords: 'watch design, horology, CAD, brand strategy, Swiss Made, mechanical watches',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
