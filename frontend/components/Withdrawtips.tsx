// frontend/app/components/WithdrawTips.tsx
'use client';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';
import { Alert } from '@/components/alert';
import { useState } from 'react';

export default function WithdrawTips() {
  const { isConnected } = useAccount();
 const [ alertMessage, setAlertMessage ] = useState('');
  const [ showAlert, setShowAlert ] = useState(false); 
  
  const withdraw = async () => {
    if (!isConnected || !window.ethereum) {
      setAlertMessage('Please connect your wallet anon!');
      setShowAlert(true);
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setShowAlert(false);
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.withdrawTips();
      await tx.wait();
      setAlertMessage('🔐 Tips withdrawn successfully!');
      setShowAlert(true);
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setShowAlert(false);
      });
    } catch (err) {
      setAlertMessage('Failed to withdraw');
      setShowAlert(true);
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setShowAlert(false);
      });
    }
  };

  return (
    <>
      <Alert
        message={alertMessage}
        display={showAlert ? 'block' : 'none'}
      />
      <button
        onClick={withdraw}
        className="mt-4 bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-emerald-600 hover:pointer cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🔐 Withdraw Tips
      </button>
    </>

  );
}
