import { useState } from 'react';
import { ImagePreview } from '@/types/profile';

export const useImagePreview = () => {
  const [imagePreview, setImagePreview] = useState<ImagePreview>({
    profile: null,
    header: null
  });

  return { imagePreview, setImagePreview };
};