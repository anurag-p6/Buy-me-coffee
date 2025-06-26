import { useState } from 'react';
import { ProfileData } from '@/types/profile';

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    profileImage: null,
    headerImage: null,
    socialLinks: {
      website: '',
      twitter: '',
      github: '',
      instagram: '',
      linkedin: ''
    }
  });

  return { profileData, setProfileData };
}