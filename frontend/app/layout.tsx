import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Header from '@/components/Header'
import { Providers } from '@/components/providers';
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ETH Ka Pyala',
  description: 'A platform to support your favorite creators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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