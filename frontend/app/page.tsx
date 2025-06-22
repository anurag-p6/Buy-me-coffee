import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-screen">
      <div className="flex flex-col items-center">
      <h1 className="text-white">My App</h1>
      <ConnectButton />   
      </div>
    </div>
  );
}