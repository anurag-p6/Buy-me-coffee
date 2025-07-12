'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomConnectWallet from '@/components/CustomConnectWallet'
import CoffeeSvg from '@/components/ui/CoffeeSvg'
import ChainModalTrigger from '@/components/ui/UserSvg'

function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null)
  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

export default function Header() {
  const width = useWindowWidth()
  const isMobile = width !== null && width <= 720

  return (
    <header className="w-full py-4 border-b flex justify-between items-center bg-zinc-900 shadow-sm">
      <Link href="/" className="text-md font-bold text-blue-500 ml-4 md:ml-6">
        <CoffeeSvg />
      </Link>
      <div className="text-sm mr-6">
        {isMobile ? (
            <ChainModalTrigger />
        ) : (
         <CustomConnectWallet />
        )}
      </div>
    </header>
  )
}
