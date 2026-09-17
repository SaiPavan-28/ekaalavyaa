import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'parchment' | 'outlined' | 'interactive' | 'forest';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  accentBorder?: 'none' | 'terracotta' | 'forest' | 'mustard';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  accentBorder = 'none',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  }[padding];

  const variantStyles = {
    default: 'bg-white border border-[#E2DAC9] rounded-xs shadow-[0_1px_2px_rgba(28,25,23,0.03)]',
    parchment: 'bg-[#FAF6EE] border border-[#E5DECf] rounded-xs',
    outlined: 'bg-transparent border border-[#E2DAC9] rounded-xs',
    forest: 'bg-[#162D22] border border-[#234535] text-[#FAF7F2] rounded-xs',
    interactive: 'bg-white border border-[#E2DAC9] rounded-xs shadow-[0_1px_2px_rgba(28,25,23,0.03)] hover:border-[#BFAF98] hover:shadow-[0_2px_6px_rgba(28,25,23,0.06)] transition-all duration-150 cursor-pointer',
  }[variant];

  const accentStyles = {
    none: '',
    terracotta: 'border-t-2 border-t-[#A8432B]',
    forest: 'border-t-2 border-t-[#1B382B]',
    mustard: 'border-t-2 border-t-[#C58F2C]',
  }[accentBorder];

  return (
    <div className={`${variantStyles} ${accentStyles} ${paddingStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
