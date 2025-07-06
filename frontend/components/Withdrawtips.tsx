// frontend/app/components/WithdrawTips.tsx
'use client';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';

export default function WithdrawTips() {
  const { isConnected } = useAccount();

  const withdraw = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.withdrawTips();
      await tx.wait();
      alert('✅ Tips withdrawn!');
    } catch (err) {
      console.error(err);
      alert('Failed to withdraw');
    }
  };

  return (
    <button
      onClick={withdraw}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
    >
      🔐 Withdraw Tips
    </button>
  );
}
