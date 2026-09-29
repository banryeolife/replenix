import React, { useState } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import { Logo } from './Logo';

interface StoreAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreAuditModal: React.FC<StoreAuditModalProps> = ({ isOpen, onClose }) => {
  const [revenue, setRevenue] = useState<number>(80000000); // 8,000만 원
  const [skuCount, setSkuCount] = useState<number>(180);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  // Real formula for estimated losses based on e-commerce benchmarks
  const estimatedStockoutLoss = Math.round(revenue * 0.11);
  const estimatedTiedUpCash = Math.round(revenue * 0.28);
  const annualProfitRecovery = Math.round((estimatedStockoutLoss * 0.8 + estimatedTiedUpCash * 0.25) * 12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl text-slate-800 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <Logo size="sm" showTagline={false} />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-2">
              <Calculator className="h-4 w-4" />
              <span>간편 스토어 재고 진단</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              우리 스토어 재고 손실 진단
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              월 매출과 관리 품목(SKU) 수를 조절하면 품절 손실과 묶인 재고 현금을 즉시 계산합니다.
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>월평균 총 매출액</span>
                  <span className="text-indigo-600 font-mono font-bold">
                    {(revenue / 10000).toLocaleString()}만 원
                  </span>
                </div>
                <input
                  type="range"
                  min="10000000"
                  max="500000000"
                  step="5000000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>1,000만 원</span>
                  <span>1억 원</span>
                  <span>5억 원</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>관리 중인 상품 수 (SKU)</span>
                  <span className="text-indigo-600 font-mono font-bold">{skuCount}개</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={skuCount}
                  onChange={(e) => setSkuCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>20개</span>
                  <span>180개 (평균)</span>
                  <span>1,000개+</span>
                </div>
              </div>

              {/* Diagnostic Results Box */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <TrendingDown className="h-4 w-4 text-indigo-600" />
                  <span>진단 결과: 현재 발생 중인 추정 손실</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-lg bg-white p-3 border border-slate-200">
                    <div className="text-[11px] text-slate-500">월간 품절 기회 손실</div>
                    <div className="text-base font-bold text-rose-600 mt-0.5">
                      약 {(estimatedStockoutLoss / 10000).toLocaleString()}만 원/월
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-3 border border-slate-200">
                    <div className="text-[11px] text-slate-500">창고에 잠긴 여유 현금</div>
                    <div className="text-base font-bold text-amber-600 mt-0.5">
                      약 {(estimatedTiedUpCash / 10000).toLocaleString()}만 원
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600">Replenix 도입 시 예상 회수액</span>
                  <span className="text-indigo-600 font-extrabold font-mono text-sm">
                    +{(annualProfitRecovery / 100000000).toFixed(1)}억 원/년
                  </span>
                </div>
              </div>

              {/* Action Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    진단서 및 엑셀 템플릿을 받을 이메일
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>상세 진단 보고서 받기</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">진단서 발송 예약이 완료되었습니다</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              입력하신 <strong>{email}</strong> 주소로 맞춤 진단 보고서와 실전 엑셀 서식을 보내드립니다.
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

