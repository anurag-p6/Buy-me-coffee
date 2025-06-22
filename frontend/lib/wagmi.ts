import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';
import dotenv from 'dotenv';
dotenv.config();


export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YO41909ddc244fdf315732f55cccc69406', // Get from https://cloud.walletconnect.com
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});