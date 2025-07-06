import { ConnectButton } from '@rainbow-me/rainbowkit';
import BuyCoffeeForm from '@/components/BuyCoffeeForm';
import MemoList from '@/components/MemoList';
import WithdrawTips from '@/components/Withdrawtips';
import CustomConnectWallet from '@/components/CustomConnectWallet';

export default function Home() {
  return (
    <>
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    
    {/* Left Side: Buy Coffee */}
    <main className="flex-1 md:w-2/3 p-6 bg-zinc-900 rounded-xl shadow-lg m-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">☕ Buy Me A Coffee</h1>
      <div className="flex justify-center mb-4">
          <CustomConnectWallet />
      </div>
      <BuyCoffeeForm />
      <WithdrawTips />
    </main>

    {/* Right Side: Memos */}
    <aside className="w-full md:w-1/3 p-6 bg-white shadow-inner border-l border-gray-300">
      <MemoList />
    </aside>

  </div>
</>

  );
}

