import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'terracotta' | 'forest' | 'ochre' | 'stone' | 'danger' | 'mustard';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'stone',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[10px] sm:text-[11px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-medium',
  }[size];

  const variantStyles = {
    terracotta: 'bg-[#FDF2EE] text-[#A8432B] border border-[#F1D3C9]',
    forest: 'bg-[#EBF3EE] text-[#1B382B] border border-[#C2D9CD]',
    ochre: 'bg-[#FEF8EC] text-[#9B6D1B] border border-[#F5E0B3]',
    mustard: 'bg-[#FEF8EC] text-[#9B6D1B] border border-[#F5E0B3]',
    stone: 'bg-[#F2ECE0] text-[#47423B] border border-[#DFD5C2]',
    danger: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]',
  }[variant];

  const dotColors = {
    terracotta: 'bg-[#A8432B]',
    forest: 'bg-[#1B382B]',
    ochre: 'bg-[#C58F2C]',
    mustard: 'bg-[#C58F2C]',
    stone: 'bg-[#6E675D]',
    danger: 'bg-[#DC2626]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs whitespace-nowrap leading-none ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors} flex-shrink-0`} />}
      <span>{children}</span>
    </span>
  );
};
