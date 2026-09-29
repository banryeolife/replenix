import React from 'react';
import { Boxes, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  isWhite?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  isWhite = false,
}) => {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizes = {
    sm: 'h-7 w-7 rounded-lg',
    md: 'h-9 w-9 rounded-xl',
    lg: 'h-11 w-11 rounded-2xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${containerSizes[size]} bg-gradient-to-br from-indigo-600 via-indigo-600 to-slate-900 text-white shadow-sm ring-1 ring-indigo-500/20 group`}
      >
        {/* Core Inventory / Replenishment Symbol */}
        <Boxes className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />

        {/* Dynamic replenishment active indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center">
          <span
            className={`font-black tracking-tight leading-none ${textSizes[size]} ${
              isWhite ? 'text-white' : 'text-slate-900'
            }`}
          >
            Replen<span className="text-indigo-600">ix</span>
          </span>
          <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
            PRO
          </span>
        </div>

        {showTagline && (
          <span
            className={`font-medium tracking-tight mt-0.5 leading-none ${taglineSizes[size]} ${
              isWhite ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            스마트 발주 계산기
          </span>
        )}
      </div>
    </div>
  );
};
