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
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const data = await contract.getMemos();
      setMemos(data.reverse());
    };
    loadMemos();
  }, []);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold">☕ Recent Memos</h2>
      {memos.map((memo, idx) => (
        <div key={idx} className="p-3 border rounded-md shadow-sm">
          <p className="font-semibold">{memo.name}</p>
          <p>{memo.message}</p>
          <small className="text-gray-500 text-sm">
            From: {memo.from.slice(0, 6)}...{memo.from.slice(-4)} at{' '}
            {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
