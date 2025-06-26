'use client';
import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, User, Globe, Twitter, Github, Instagram, Linkedin, Camera, Save, Loader2 } from 'lucide-react';
import { ProfileData, SocialLinks, ImagePreview, SocialPlatform, ProfileMetadata } from '@/types/profile';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useProfileData } from '@/hooks/useProfileData';


const ProfileCreationSection: React.FC = () => {
  const { profileData, setProfileData } = useProfileData(); // custon hook to manage the profile data
 
  const { imagePreview, setImagePreview } = useImagePreview();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);

  const profileImageRef = useRef<HTMLInputElement>(null);
  const headerImageRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageType: 'profile' | 'header'): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setIsUploading(true);

    try {
      const base64 = await convertToBase64(file);

      setProfileData(prev => ({
        ...prev,
        [imageType === 'profile' ? 'profileImage' : 'headerImage']: base64
      }));

      setImagePreview(prev => ({
        ...prev,
        [imageType]: base64
      }));
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (field: string, value: string): void => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.') as ['socialLinks', keyof SocialLinks];
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateSocialUrl = (platform: keyof SocialLinks, url: string): boolean => {
    if (!url) return true;

    const patterns: Record<keyof SocialLinks, RegExp> = {
      website: /^https?:\/\/.+/,
      twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
      github: /^https?:\/\/(www\.)?github\.com\/.+/,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+/
    };

    return patterns[platform] ? patterns[platform].test(url) : true;
  };

  const handleCreateProfile = async (): Promise<void> => {
    if (!profileData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!profileData.bio.trim()) {
      alert('Please enter your bio');
      return;
    }

    for (const [platform, url] of Object.entries(profileData.socialLinks) as [keyof SocialLinks, string][]) {
      if (url && !validateSocialUrl(platform, url)) {
        alert(`Please enter a valid ${platform} URL`);
        return;
      }
    }

    setIsCreatingProfile(true);

    try {
      const profileMetadata: ProfileMetadata = {
        name: profileData.name,
        bio: profileData.bio,
        profileImage: profileData.profileImage,
        headerImage: profileData.headerImage,
        socialLinks: profileData.socialLinks,
        createdAt: Date.now()
      };

      console.log('Creating profile with metadata:', profileMetadata);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Profile created successfully on blockchain!');

    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setIsCreatingProfile(false);
    }
  };

  const socialPlatforms: SocialPlatform[] = [
    { key: 'website', icon: Globe, placeholder: 'https://yourwebsite.com' },
    { key: 'twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { key: 'github', icon: Github, placeholder: 'https://github.com/username' },
    { key: 'instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
    { key: 'linkedin', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' }
  ];

  // JSX return block remains unchanged
  return (
    <div className="min-h-[500px] bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Profile
          </h1>
          <p className="text-lg text-gray-600">
            Set up your profile to start receiving tips from your supporters
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Image Section */}
          <div className="relative h-64 bg-gradient-to-r from-purple-500 to-blue-500">
            {imagePreview.header && (
              <img 
                src={imagePreview.header} 
                alt="Header" 
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={() => headerImageRef.current?.click()}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200"
              disabled={isUploading}
              type="button"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
            </button>
            <input
              ref={headerImageRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'header')}
              className="hidden"
            />
          </div>

          {/* Profile Image Section */}
          <div className="relative -mt-16 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview.profile ? (
                  <img 
                    src={imagePreview.profile} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => profileImageRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200"
                disabled={isUploading}
                type="button"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              </button>
              <input
                ref={profileImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profile')}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your display name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  maxLength={50}
                />
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell your supporters about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {profileData.bio.length}/500
                </div>
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Social Links
                </label>
                <div className="space-y-4">
                  {socialPlatforms.map(({ key, icon: Icon, placeholder }) => (
                    <div key={key} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="url"
                        value={profileData.socialLinks[key]}
                        onChange={(e) => handleInputChange(`socialLinks.${key}`, e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Profile Button */}
              <div className="pt-6">
                <button
                  onClick={handleCreateProfile}
                  disabled={isCreatingProfile || !profileData.name.trim() || !profileData.bio.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  type="button"
                >
                  {isCreatingProfile ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Profile on Blockchain...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Create Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {/* <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500 relative">
              {imagePreview.header && (
                <img 
                  src={imagePreview.header} 
                  alt="Header Preview" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-6 -mt-8 relative">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imagePreview.profile ? (
                    <img 
                      src={imagePreview.profile} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {profileData.name || 'Your Name'}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {profileData.bio || 'Your bio will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCreationSection;
