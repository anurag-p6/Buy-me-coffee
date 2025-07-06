// frontend/app/components/MemoList.tsx
'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';

interface Memo {
  from: string;
  timestamp: bigint;
  name: string;
  message: string;
}

export default function MemoList() {
  const [memos, setMemos] = useState<Memo[]>([]);
  useEffect(() => {
    const loadMemos = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const rawMemos = await contract.getMemos();

        const cleanMemos: Memo[] = rawMemos.map((memo: any) => ({
          from: memo[0],
          timestamp: Number(memo[1]),
          name: memo[2],
          message: memo[3],
        }))
        setMemos(cleanMemos.reverse().slice(0, 4));
        // setMemos(data.reverse())
      } catch (error) {
        console.error('Error loading memos:', error as Error);
      }
    };

    loadMemos();
  }, []);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">☕ Recent Memos</h2>
      {memos.length === 0 ? (
        <p className="text-gray-500 text-[10px]">No memos yet. Be the first to send one!</p>
      ) : (memos.map((memo, index) => (
        <div key={index} className="border min-h-[10px] min-w-full rounded-lg px-4 py-8 shadow-sm">
          <p className="text-md font-semibold ">💬 {memo.message}</p>
          <p className="text-[2px] text-gray-600 ">From: {memo.name} {memo.from}</p>
          <p className="text-[2px] text-gray-400 ">
            {/* {new Date(memo.timestamp * 1000).toLocaleString()} */}
          </p>
        </div>
      )))}
    </div>
  );
}
