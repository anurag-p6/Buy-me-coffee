import React, { useState } from 'react';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useProfileData } from '@/hooks/useProfileData';
import { User } from 'lucide-react';

export const ProfileView = () => {
  const { imagePreview, setImagePreview } = useImagePreview();
  const { profileData, setProfileData } = useProfileData();
  return (
    <div className="mt-8 min-h-36 min-w-36 bg-white rounded-2xl shadow-xl p-6">
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
    </div>
  );
}