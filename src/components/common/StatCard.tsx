import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    neutral?: boolean;
  };
  icon?: React.ReactNode;
  badge?: string;
  accent?: 'none' | 'forest' | 'terracotta' | 'mustard';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  trend,
  icon,
  badge,
  accent = 'none',
}) => {
  return (
    <Card
      accentBorder={accent}
      className="flex flex-col justify-between border-[#E2DAC9] bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(28,25,23,0.03)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#7C7467] block truncate">
            {label}
          </span>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1D1A] font-serif">
              {value}
            </span>
            {badge && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-xs bg-[#F4EFE6] text-[#635746] border border-[#DDD3C2] whitespace-nowrap">
                {badge}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xs bg-[#FAF6EE] border border-[#E5DECf] flex items-center justify-center text-[#1B382B] flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3.5 pt-2.5 border-t border-[#F0EAE0] flex items-center justify-between gap-2 text-xs">
          {subtitle && <span className="text-[#6E675D] truncate text-[11px] sm:text-xs">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1 flex-shrink-0 text-[11px] sm:text-xs ${
                trend.neutral
                  ? 'text-[#5E584E]'
                  : trend.isPositive
                  ? 'text-[#1B382B]'
                  : 'text-[#991B1B]'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
