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
      className="flex flex-col justify-between glass p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7C7467] block truncate">
            {label}
          </span>
          <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1D1A] font-serif">
              {value}
            </span>
            {badge && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/60 text-[#635746] border border-black/5 whitespace-nowrap shadow-sm">
                {badge}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center text-[#1B382B] flex-shrink-0 shadow-sm">
            {icon}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-2 text-xs">
          {subtitle && <span className="text-[#6E675D] truncate text-[11px] sm:text-xs font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1.5 flex-shrink-0 text-[11px] sm:text-xs px-2 py-0.5 rounded-md ${
                trend.neutral
                  ? 'bg-black/5 text-[#5E584E]'
                  : trend.isPositive
                  ? 'bg-[#1B382B]/10 text-[#1B382B]'
                  : 'bg-[#991B1B]/10 text-[#991B1B]'
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
