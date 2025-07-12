// frontend/app/components/BuyCoffeeForm.tsx
'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';
import { Alert } from '@/components/alert';
import Image from 'next/image'

export default function BuyCoffeeForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { isConnected } = useAccount();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [amount, setAmount] = useState('0.001')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendCoffee = async () => {
    if (!isConnected || !window.ethereum) {
      setAlertMessage('Please connect your wallet first');
      setShowAlert(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowAlert(false);
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log(contract);
      const tx = await contract.buyCoffee(name, message, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      setAlertMessage('Coffee sent successfully!🫡');
      setShowAlert(true);
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        setShowAlert(false);
      });
      
      setIsLoading(false);
      onSuccess();
      setName('');
      setMessage('');
      setAmount('0.001');
    } catch {
      setAlertMessage('Failed to send coffee. Please try again.');
      setIsLoading(false);
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
      <div className="space-y-4 p-4 border rounded-lg shadow-md">
        <input
          className="border p-2 w-full text-white"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border p-2 w-full text-white"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-gray-400 mb-2">
          Enter the amount of ETH
        </p>
        <input
          type="number"
          step="any"
          value={amount}
          min="0.001"
          className="border p-2 w-full text-white"
          placeholder="Amount in ETH (default 0.001)"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 cursor-pointer transition-colors duration-300'
          onClick={sendCoffee}>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Image src="/Loader.svg" height={25} width={25} alt="Loading..." className="animate-spin" />
            </div>
          ) : (
            <span>Send Coffee</span>
          )}
        </button>
      </div>
    </>
  );
}
