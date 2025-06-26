export interface SocialLinks {
  website: string;
  twitter: string;
  github: string;
  instagram: string;
  linkedin: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  profileImage: string | null;
  headerImage: string | null;
  socialLinks: SocialLinks;
}

export interface ImagePreview {
  profile: string | null;
  header: string | null;
}

export interface SocialPlatform {
  key: keyof SocialLinks;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
}

export interface ProfileMetadata extends ProfileData {
  createdAt: number;
}
