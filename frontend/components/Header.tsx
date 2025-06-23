'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Copy from '@/components/ui/Copy'

export default function Header() {
  return (
    <header className="w-full py-4 border-b flex justify-between items-center bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-indigo-600 ml-4">
        EHTopia🪙
      </Link>
      <div className="text-sm mr-6">
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, openChainModal, openAccountModal, mounted }) => {
            return (
              <div
                className="flex gap-2 items-center text-sm"
                aria-hidden={!mounted}
                style={{ opacity: mounted ? 1 : 0, pointerEvents: mounted ? 'auto' : 'none' }}
              >
                {!account ? (
                  <button
                    onClick={openConnectModal}
                    className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-700"
                  >
                    Connect
                  </button>
                ) : (
                  <>
                   <button
                      onClick={openAccountModal}
                      className=" flex justify-between item-center px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm text-pink-600"
                    >
                      {account.displayName}
                    </button>
                    <span className='text-black'>
                        {account.displayBalance}
                    </span>
                  </>
                )}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  )
}
