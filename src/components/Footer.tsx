import React from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenAudit: () => void;
  onOpenInvestor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit, onOpenInvestor }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <Logo size="sm" showTagline={false} />
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              이커머스 셀러를 위한 자본 제약 기반 재고 발주 최적화 솔루션. 
              품절 손실을 줄이고 창고에 묶인 현금 회전을 극대화합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenAudit}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              스토어 무료 진단
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={onOpenInvestor}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              IR 피치 덱 문의
            </button>
            <span className="text-slate-300">•</span>
            <a
              href="mailto:contact@replenix.ai"
              className="text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors font-medium"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>contact@replenix.ai</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            <span>수리 최적화(Mathematical Optimization) 알고리즘 기반 엔진</span>
          </div>
          <div>
            © {new Date().getFullYear()} Replenix Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

