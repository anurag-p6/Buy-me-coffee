// frontend/app/components/MemoList.tsx
'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';
import { fetchMemos } from '@/lib/fetchMemos';
import { Memo } from '@/types/memos';

const MemoList = ({ memos }: { memos: Memo[] }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold w-fit mx-auto">Recent Memos</h2>
      {memos.length === 0 ? (
        <p className="text-gray-500 text-[10px]">No memos yet. Be the first to send one!</p>
      ) : (memos.map((memo, index) => (
        <div key={index} className="border min-h-[10px] px-4 py-6 shadow-sm">
          <p className="text-[10px] font-semibold text-blue-600 "><span className="text-gray-500">MSG:</span> {memo.message}</p>
          <p className="text-[10px] text-yellow-600 "><span className="text-gray-500">From:</span> {memo.name} </p>
          <p className="text-[10px] text-green-500"><span className="text-gray-500">Amount:</span> {ethers.formatEther(memo.amount)} ETH</p>
          <p className="text-[10px] text-gray-500 ">
             {memo.from.slice(0, 6)}...{memo.from.slice(-4)}
          </p>
          <p className='text-[10px] md:text-[10px]'>
            {new Date(memo.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      )))}
    </div>
  );
}

export default MemoList;