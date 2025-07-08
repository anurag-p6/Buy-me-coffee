import { ConnectButton } from '@rainbow-me/rainbowkit';
import BuyCoffeeForm from '@/components/BuyCoffeeForm';
import MemoList from '@/components/MemoList';
import WithdrawTips from '@/components/Withdrawtips';
import CustomConnectWallet from '@/components/CustomConnectWallet';

export default function Home() {
  return (
    <>
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
  {/* Left Side */}
  <main className="w-full md:w-2/3 p-6 bg-zinc-900 rounded-r-xl text-white">
    <h1 className="text-3xl font-bold text-center mb-6">☕ Buy Me A Coffee</h1>
    <div className="flex justify-center mb-4">
      <CustomConnectWallet />
    </div>
    <BuyCoffeeForm />
    <WithdrawTips />
  </main>

  {/* Right Side */}
  <aside className="w-xl md:w-1/3 p-4 md:p-6 bg-white overflow-y-auto">
    <MemoList />
  </aside>
</div>

</>

  );
}

