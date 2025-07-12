'use client'
import { useEffect, useState } from 'react';
import BuyCoffeeForm from '@/components/BuyCoffeeForm';
import MemoList from '@/components/MemoList';
import WithdrawTips from '@/components/Withdrawtips';
import CustomConnectWallet from '@/components/CustomConnectWallet';
import { fetchMemos } from '@/lib/fetchMemos';
import { Memo } from '@/types/memos';

export default function Home() {
const [memos, setMemos] = useState<Memo[]>([]);
   const loadMemos = async () => {
    const memos = await fetchMemos();
    setMemos(memos);
  };

  useEffect(() => {
    loadMemos();
  }, []);

  return (
    <>
  <div className="flex md:text-sm flex-col md:flex-row min-h-screen bg-gray-100">
  {/* Left Side */}
  <main className="w-full md:w-2/3 p-6 bg-zinc-900 rounded-b-sm md:rounded-l-none md:rounded-r-xl text-white">
    <h1 className="text-xl md:text-3xl font-bold text-center mb-6">Hey Anon! Buy me a Crypto Coffee</h1>
    <div className="flex justify-center mb-4">
      <CustomConnectWallet />
    </div>
    <BuyCoffeeForm onSuccess={loadMemos} />
    <WithdrawTips />
  </main>

  {/* Right Side */}
  <aside className="w-full md:w-1/3 p-4 md:p-6 bg-white overflow-y-auto">
    <MemoList memos={memos} />
  </aside>
</div>

</>

  );
}

