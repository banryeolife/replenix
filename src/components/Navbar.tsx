import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center">
            <Logo size="md" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#working-capital-summary" className="hover:text-slate-900 transition-colors">
            운전자본 효과
          </a>
          <a href="#simulator" className="hover:text-slate-900 transition-colors">
            발주 계산기
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
            계산 원리
          </a>
          <a href="#results" className="hover:text-slate-900 transition-colors">
            실제 도입 효과
          </a>
          <a href="#story" className="hover:text-slate-900 transition-colors">
            개발 배경
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            id="btn-open-audit"
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 active:scale-95 transition-all"
          >
            <span>스토어 무료 진단</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

