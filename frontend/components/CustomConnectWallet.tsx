'use client'
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function CustomConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, openAccountModal, mounted }) => {
        return (
          <div
            className="flex gap-2 items-center text-sm"
            aria-hidden={!mounted}
            style={{ opacity: mounted ? 1 : 0, pointerEvents: mounted ? 'auto' : 'none' }}
          >
            {!account || !chain ? (
              <button
                onClick={openConnectModal}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer transition-colors duration-300"
              >
                Connect
              </button>
            ) : (
              <>
                {/* Chain Info Button */}
                <button
                  onClick={openChainModal}
                  className="flex items-center px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  {chain.hasIcon && chain.iconUrl && (
                    <Image
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl || '/default-chain-icon.png'}
                      width={16}
                      height={16}
                      style={{ borderRadius: 999, marginRight: 4 }}
                    />
                  )}
                  {chain.name}
                </button>
                <div className='flex items-center gap-1 pl-2 rounded-md  bg-white '>
                  <span className='text-blue-500 mr-4 inline-block'>
                    {account.displayBalance}
                  </span>
                  <button
                    onClick={openAccountModal}
                    className=" flex justify-between item-center px-3 py-1 bg-gray-200 border border-gray-300 rounded-md text-sm text-red-500 cursor-pointer"
                  >
                    {account.displayName}
                  </button>
                </div>
              </>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

