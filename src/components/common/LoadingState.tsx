import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse p-4">
      <div className="h-6 bg-[#EBE4D5] rounded-md w-1/3 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-10 w-10 bg-[#E8E1D3] rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#E8E1D3] rounded-md w-3/4" />
            <div className="h-3 bg-[#EFE9DC] rounded-md w-1/2" />
          </div>
          <div className="h-8 bg-[#E8E1D3] rounded-md w-20" />
        </div>
      ))}
    </div>
  );
};
