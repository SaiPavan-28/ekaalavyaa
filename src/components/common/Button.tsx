import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warm' | 'mustard';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer tracking-normal active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-6 py-3 text-sm sm:text-base gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#A8432B] to-[#C5533A] text-white hover:shadow-md focus:ring-[#A8432B]/50 shadow-sm',
    secondary: 'bg-gradient-to-r from-[#1B382B] to-[#2B5441] text-white hover:shadow-md focus:ring-[#1B382B]/50 shadow-sm',
    mustard: 'bg-gradient-to-r from-[#C58F2C] to-[#E3A83B] text-white hover:shadow-md focus:ring-[#C58F2C]/50 shadow-sm font-semibold',
    warm: 'bg-gradient-to-r from-[#EAE0D0] to-[#F1E8D9] text-[#332C22] hover:shadow-sm focus:ring-[#8C6D4F]/50 border border-[#D9CEBC]',
    outline: 'border border-[#D2C7B3] bg-white/70 backdrop-blur-sm text-[#24211D] hover:bg-white hover:shadow-sm focus:ring-[#A8432B]/50',
    ghost: 'text-[#3F3A33] hover:bg-black/5 active:bg-black/10 focus:ring-[#78716C]/50',
    danger: 'bg-gradient-to-r from-[#991B1B] to-[#B91C1C] text-white hover:shadow-md focus:ring-[#991B1B]/50 shadow-sm',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
