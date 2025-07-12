import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';
import { Memo } from '@/types/memos';

export const fetchMemos = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const rawMemos = await contract.getMemos();

    const cleanMemos = rawMemos.map((memo: Memo[]) => ({
      from: memo[0],
      timestamp: Number(memo[1]),
      name: memo[2],
      message: memo[3],
      amount: memo[4],
    }));

    return cleanMemos.reverse().slice(0, 4); // just return data
  } catch (err) {
    console.error('Error fetching memos:', err);
    return []; // return empty array on error
  }
};
