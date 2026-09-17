import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-[#DDD5C5] bg-[#FAF7F0] my-4">
      <div className="w-12 h-12 rounded-full bg-[#EFE9DC] text-[#8C6D4F] flex items-center justify-center mb-3">
        {icon || <BookOpen className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-bold text-[#1C1917] mb-1 font-serif">{title}</h3>
      <p className="text-sm text-[#78716C] max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
