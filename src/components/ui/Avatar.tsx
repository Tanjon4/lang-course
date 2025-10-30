"use client";

import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt: string;
  username: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ 
  src, 
  alt, 
  username, 
  className = "", 
  size = "md" 
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm", 
    lg: "w-12 h-12 text-base"
  };

  // Si pas de source OU erreur de chargement, afficher l'avatar par défaut
  if (!src || imageError) {
    return (
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full bg-amber-500 flex items-center justify-center text-white font-semibold
          ${className}
        `}
      >
        {username.charAt(0).toUpperCase()}
      </div>
    );
  }

  // Image de l'API ou locale
  return (
    <Image
      src={src}
      alt={alt}
      width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
      height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      onError={() => setImageError(true)}
      priority={size === 'lg'}
    />
  );
}