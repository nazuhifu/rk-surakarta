export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  title: string;
  company: string;
  year: string;
  description?: string;
}

export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
}

export interface Awardee {
  _id: string;
  name?: string | null;
  role?: string | null;
  program?: string | null;
  year?: string | null;
  image?: any;
  coverImage?: any;
  bio?: string;
  education?: Education[];
  experience?: Experience[];
  achievements?: string[];
  testimonial?: string;
  socialMedia?: SocialMedia;
  slug?: {
    current?: string;
  };
  imageUrl?: string;
}

export interface AwardeeCardProps {
  name?: string | null;
  role?: string | null;
  program?: string | null;
  year?: string | null;
  image: string;
  slug?: string;
}
