import { ConnectButton } from '@rainbow-me/rainbowkit';
import ProfileCreationSection from '@/components/PageContent';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#f953c6] to-[#b91d73] ">
      <div className="flex flex-col items-center">
       <UploadForm />
      </div>
    </div>
  );
}