import { ConnectButton } from '@rainbow-me/rainbowkit';
import ProfileCreationSection from '@/components/PageContent';
import UploadForm from '@/components/UploadForm';
import { ProfileView }  from '@/components/SideBar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0c0c0c] to-[#9f9399] px-8 py-12">
      <div className="flex flex-1/3 justify-evenly items-start gap-8 w-full">
        {/* Left: Profile section */}
        <div className="flex-1 max-w-3xl">
          <ProfileCreationSection />
        </div>

        {/* Right: Sidebar */}
        <div className="w-[500px]">
          <ProfileView />
        </div>
      </div>
    </div>
  );
}
