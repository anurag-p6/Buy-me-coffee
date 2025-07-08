'use client'

import Link from 'next/link'
import CustomConnectWallet from '@/components/CustomConnectWallet'
import Copy from '@/components/ui/Copy'
import CoffeeSvg from '@/components/ui/CoffeeSvg'

export default function Header() {
  return (
    <header className="w-full py-4 border-b flex justify-between items-center bg-zinc-900 shadow-sm">
      <Link href="/" className="text-md font-bold text-blue-500 ml-4">
      <CoffeeSvg />
      </Link>
      <div className="text-sm mr-6">
        <CustomConnectWallet />
      </div>
    </header>
  )
}
