import React, { useState } from 'react';
import { X, Download, Building2, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface InvestorDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestorDeckModal: React.FC<InvestorDeckModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [vcName, setVcName] = useState('');
  const [requested, setRequested] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!requested ? (
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100">
              <Logo size="sm" showTagline={false} />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-2">
              <Building2 className="h-4 w-4" />
              <span>투자 및 협력 문의</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Replenix 사업 소개서 및 IR 덱 요청
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              자사몰 7년 실측 원장 데이터, 수리 최적화 알고리즘 구조, 비즈니스 모델 및 성장 지표가 담긴 소개서를 전달해 드립니다.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 mb-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>솔루션: <strong>수리 최적화 기반 자율 발주 SaaS</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>실증 데이터: <strong>외부 80+ 스토어 인터뷰 및 파일럿 테스트 완료</strong></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  소속 기관명 또는 기업명
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 00벤처스 / 00브랜드"
                  value={vcName}
                  onChange={(e) => setVcName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  자료를 수신할 이메일
                </label>
                <input
                  type="email"
                  required
                  placeholder="partner@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="h-4 w-4" />
                <span>소개서 및 IR 덱 요청하기</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">자료 요청이 완료되었습니다</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              <strong>{vcName}</strong> ({email}) 주소로 공식 사업 소개서와 데이터셋 안내 링크를 발송해 드립니다.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

