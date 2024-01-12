import { Roboto } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layouts/Nav'
import Footer from '@/components/layouts/Footer';
import { AppProvider } from '@/components/AppContext';

const roboto = Roboto({ subsets: ['latin'], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata = {
  title: 'Memories - Share your Blogs',
  description: 'Explore a world of insights and stories on Memories. Engaging narratives and thoughtful reflections. Join us on a journey of discovery.'
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-5xl mx-auto'>
          <AppProvider>
            <Nav />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
