import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'terracotta' | 'forest' | 'ochre' | 'stone' | 'mustard';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = true,
  color = 'terracotta',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }[size];

  const colorStyles = {
    terracotta: 'bg-[#A8432B]',
    forest: 'bg-[#1B382B]',
    ochre: 'bg-[#C58F2C]',
    mustard: 'bg-[#C58F2C]',
    stone: 'bg-[#6E675D]',
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-[#5E584E] mb-1 font-medium">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-bold text-[#1F1D1A]">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-xs bg-[#EAE2D4] ${sizeStyles}`}>
        <div
          className={`${sizeStyles} rounded-xs transition-all duration-300 ${colorStyles}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
