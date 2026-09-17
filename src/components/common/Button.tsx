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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xs transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer tracking-normal';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-[#A8432B] text-[#FAF7F2] hover:bg-[#8F3721] active:bg-[#782D1B] focus:ring-[#A8432B] shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
    secondary: 'bg-[#1B382B] text-[#FAF7F2] hover:bg-[#142B20] active:bg-[#0E1E16] focus:ring-[#1B382B] shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
    mustard: 'bg-[#C58F2C] text-[#1F1D1A] hover:bg-[#B07C20] active:bg-[#9B6B17] focus:ring-[#C58F2C] shadow-[0_1px_2px_rgba(0,0,0,0.08)] font-semibold',
    warm: 'bg-[#EAE0D0] text-[#332C22] hover:bg-[#DFD3BF] active:bg-[#D4C5AD] focus:ring-[#8C6D4F] border border-[#D9CEBC]',
    outline: 'border border-[#D2C7B3] bg-white text-[#24211D] hover:bg-[#F7F3EB] active:bg-[#EFE8DA] focus:ring-[#A8432B]',
    ghost: 'text-[#3F3A33] hover:bg-[#EFE7DA] active:bg-[#E5DBCA] focus:ring-[#78716C]',
    danger: 'bg-[#991B1B] text-white hover:bg-[#7F1D1D] active:bg-[#681818] focus:ring-[#991B1B]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
