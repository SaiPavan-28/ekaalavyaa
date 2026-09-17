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
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  }[padding];

  const variantStyles = {
    default: 'glass shadow-sm rounded-xl',
    parchment: 'bg-white/60 backdrop-blur-md border border-white/40 rounded-xl shadow-sm',
    outlined: 'bg-transparent border border-black/10 rounded-xl',
    forest: 'bg-gradient-to-br from-[#1B382B]/90 to-[#234535]/90 backdrop-blur-md border border-white/10 text-white rounded-xl shadow-float',
    interactive: 'glass shadow-sm rounded-xl hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 cursor-pointer',
  }[variant];

  const accentStyles = {
    none: '',
    terracotta: 'border-t-[3px] border-t-[#A8432B]',
    forest: 'border-t-[3px] border-t-[#1B382B]',
    mustard: 'border-t-[3px] border-t-[#C58F2C]',
  }[accentBorder];

  return (
    <div className={`${variantStyles} ${accentStyles} ${paddingStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
