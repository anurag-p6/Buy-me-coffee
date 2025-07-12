import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Header from '@/components/Header'
import { Providers } from '@/components/providers';
import Footer from '@/components/Footer'
import { Press_Start_2P } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BrewETH',
  description: 'A platform to support your favorite creators',
  icons:'coffee.svg'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <Providers>
          <div className='flex flex-col min-h-screen w-full bg-gray-200'>
            <Header />
            <main className='flex-1 mx-auto w-full'>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}