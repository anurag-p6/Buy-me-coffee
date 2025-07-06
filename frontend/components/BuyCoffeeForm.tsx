// frontend/app/components/BuyCoffeeForm.tsx
'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/constants';
import { Alert } from '@/components/alert';

export default function BuyCoffeeForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { isConnected } = useAccount();
  const [ alertMessage, setAlertMessage ] = useState('');
  const [ showAlert, setShowAlert ] = useState(false);
  const [ amount, setAmount ] = useState('0.001')

  const sendCoffee = async () => {
    if (!isConnected || !window.ethereum) {
      setAlertMessage('Please connect your wallet first');
      setShowAlert(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowAlert(false);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(contract)
    try {
      const tx = await contract.buyCoffee(name, message, {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      setAlertMessage('☕ Coffee sent successfully!');
      setShowAlert(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowAlert(false);
      setName('');
      setMessage('');
      setAmount('0.001');
    } catch (err) {
      console.error(err);
      setAlertMessage('Failed to send coffee. Please try again.');
      setShowAlert(true); 
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowAlert(false);
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
        className="border p-2 w-full"
        placeholder="Your Name"
        value= {name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <p>
        Enter the amount of ETH
      </p>
      <input
        type="number"
        step="any" 
        value={amount}
        min="0.001"
        className="border p-2 w-full"
        placeholder="Amount in ETH (default 0.001)"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button 
      className='bg-white text-black px-4 py-2 rounded-md w-full'
      onClick={sendCoffee}>
        Send Coffee
      </button>
    </div>
    </>
  );
}
