import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
} from 'wagmi/chains';


export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "", // Get from https://cloud.walletconnect.com
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});