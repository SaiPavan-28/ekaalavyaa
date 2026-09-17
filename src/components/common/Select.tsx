import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (Option | string)[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-lg border bg-[#FAF8F3] px-3.5 py-2 text-sm text-[#1C1917] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B84A22] ${
          error
            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
            : 'border-[#D5CBB9] hover:border-[#B8AC96] focus:border-[#B84A22]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lab = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val} className="text-[#1C1917] bg-[#FDFBF7]">
              {lab}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-[#DC2626] font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-[#78716C]">{helperText}</p>}
    </div>
  );
};
