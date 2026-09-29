import React from 'react';
import { CreditCard, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { INVESTOR_THESIS } from '../data/mockData';

interface InvestorThesisProps {
  onOpenInvestorModal: () => void;
  isHighlight?: boolean;
}

export const InvestorThesisSection: React.FC<InvestorThesisProps> = ({
  onOpenInvestorModal,
  isHighlight = false,
}) => {
  return (
    <section 
      id="pricing" 
      className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200 text-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 shadow-xs">
            <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
            <span>요금제 안내</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            품절 방지로 아끼는 매출이 <br />
            <span className="text-indigo-600">구독료의 8배를 넘습니다</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            스토어 규모와 상품 수에 맞춘 합리적인 월 구독 모델입니다. 
            별도의 구축비나 설치 프로그램 없이 웹에서 바로 시작할 수 있습니다.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {INVESTOR_THESIS.pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 flex flex-col justify-between border transition-all ${
                tier.popular
                  ? 'border-indigo-600 bg-white shadow-md ring-1 ring-indigo-600 relative'
                  : 'border-slate-200 bg-white shadow-xs hover:border-slate-300'
              }`}
            >
              <div>
                {tier.popular && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white mb-3">
                    가장 많이 선택하는 플랜
                  </span>
                )}
                <h3 className="text-base font-bold text-slate-900">{tier.tier}</h3>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                  {tier.price}
                </div>
                <div className="text-xs text-slate-500 mt-1 pb-4 border-b border-slate-100">
                  {tier.target}
                </div>

                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    const el = document.getElementById('simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span>14일 무료 체험 시작</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise & IR Contact Box */}
        <div className="max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              투자 문의 또는 대규모 엔터프라이즈 도입을 원하시나요?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              맞춤형 ERP 연동과 사업 성장 지표(IR 자료)를 안내해 드립니다.
            </p>
          </div>
          <button
            onClick={onOpenInvestorModal}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
          >
            IR 덱 & 사업 자료 요청
          </button>
        </div>
      </div>
    </section>
  );
};

