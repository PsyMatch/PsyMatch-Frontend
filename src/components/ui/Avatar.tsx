import React from 'react';

export function Avatar({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className || ''}`} style={{ aspectRatio: '1/1' }}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, className }: { src?: string; className?: string }) {
  return src ? <img src={src} alt="avatar" className={`w-full h-full object-cover ${className || ''}`} /> : null;
}

export function AvatarFallback({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className || ''}`}>{children}</div>
  );
}
