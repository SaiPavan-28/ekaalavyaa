import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-2xs">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-[#FAF8F3] px-3.5 py-2 text-sm text-[#1C1917] placeholder-[#A8A29E] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B84A22] ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            error
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#D5CBB9] hover:border-[#B8AC96] focus:border-[#B84A22]'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#78716C]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-[#DC2626] font-medium">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-[#78716C]">{helperText}</p>
      )}
    </div>
  );
};
