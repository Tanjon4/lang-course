// components/ui/Avatar.tsx
interface AvatarProps {
  src?: string | null;
  alt?: string;
  username?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({ 
  src, 
  alt = "User avatar", 
  username = "User", 
  size = "md", 
  className = "" 
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base"
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${className}`}
    >
      {getInitials(username)}
    </div>
  );
}