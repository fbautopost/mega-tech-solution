import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'MegaTech Solution - Premium Computer Accessories & Gaming PCs',
  description: 'Your one-stop shop for premium computer accessories, gaming PCs, laptops, keyboards, mice, SSDs, and HDDs. Quality tech at competitive prices.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster position="bottom-right" richColors />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
