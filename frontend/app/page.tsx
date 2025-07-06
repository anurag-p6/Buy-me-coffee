import { ConnectButton } from '@rainbow-me/rainbowkit';
import ProfileCreationSection from '@/components/PageContent';
import UploadForm from '@/components/UploadForm';
import { ProfileView }  from '@/components/SideBar';
import dynamic from 'next/dynamic';
import BuyCoffeeForm from '@/components/BuyCoffeeForm';
import MemoList from '@/components/MemoList';
import WithdrawTips from '@/components/Withdrawtips';


export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-4 bg-blue-600 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">☕ Buy Me A Coffee</h1>
      <div className="flex justify-center mb-4">
        <ConnectButton />
      </div>
      <BuyCoffeeForm />
      <MemoList />
      <WithdrawTips />
    </main>
  );
}
