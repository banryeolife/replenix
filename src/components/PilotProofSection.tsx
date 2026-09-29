import React from 'react';
import { Award, ArrowDownRight, ArrowUpRight, CheckCircle2, Quote, Clock, TrendingDown } from 'lucide-react';
import { PILOT_CASE_METRICS } from '../data/mockData';

export const PilotProofSection: React.FC = () => {
  return (
    <section id="proof" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 shadow-xs">
            <Award className="h-3.5 w-3.5 text-indigo-600" />
            <span>도입 성과</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            실제 운영 중인 84개 스토어에서 <br />
            <span className="text-indigo-600">증명된 수치입니다</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            매주 반복되던 품절 불안감과 과잉 재고 문제를 해결하고, 
            잠긴 현금을 회수하여 건강한 사업 성장을 돕습니다.
          </p>
        </div>

        {/* Big Impact Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>품절(결품) 발생률</span>
              <span className="text-emerald-600 font-bold flex items-center">
                <ArrowDownRight className="h-4 w-4" /> 86% 감소
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              14.8% → 2.1%
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
              성수기에도 핵심 효자 상품의 품절을 막아 네이버·쿠팡 검색 랭킹 하락을 방어했습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>창고 재고 보유 일수</span>
              <span className="text-emerald-600 font-bold flex items-center">
                <ArrowDownRight className="h-4 w-4" /> 16일 단축
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              42일 → 26일
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
              같은 매출을 유지하면서 창고에 묶여 있던 16일 치의 운영 자금을 빠르게 회수했습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>3PL 풀필먼트 보관료</span>
              <span className="text-indigo-600 font-bold flex items-center">
                <TrendingDown className="h-4 w-4" /> 34% 절감
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              월 62만 원 절감
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
              부피가 큰 상품의 불필요한 과잉 발주를 억제해 매달 나가는 물류 보관료를 아꼈습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>주간 발주 소요 시간</span>
              <span className="text-indigo-600 font-bold flex items-center">
                <Clock className="h-4 w-4" /> 95% 단축
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              5시간 → 3분
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
              복잡한 엑셀 수식과 씨름할 필요 없이, 파일 업로드 한 번으로 발주서가 완성됩니다.
            </p>
          </div>
        </div>

        {/* Verified Industry Categories with Images */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              다양한 이커머스 카테고리에서 검증되었습니다
            </h3>
            <span className="text-xs text-slate-500">
              네이버 스마트스토어 · 쿠팡 로켓그로스 · 자사몰(카페24)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category 1 */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col">
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80"
                  alt="반려동물 용품 및 사료 브랜드"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  평균 240 SKU
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">반려동물 사료 · 용품</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    정기 소비 주기가 뚜렷한 사료/간식류의 품절을 예방해 정기 배송 이탈율 70% 감소
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-emerald-600">
                  품절률 16.4% → 1.8% 개선
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col">
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
                  alt="D2C 코스메틱 및 스킨케어 브랜드"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  평균 60 SKU
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">D2C 코스메틱 · 뷰티</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    제조 공장 최소주문수량(MOQ 3,000개)과 리드타임(45일)을 정확히 역산해 현금 잠김 방어
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-emerald-600">
                  불필요 과잉재고 3,800만 원 절감
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col">
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                  alt="건강기능식품 및 비타민 영양제"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  평균 110 SKU
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">건강기능식품 · 영양제</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    유통기한 임박 폐기 리스크를 0%로 만들고, 인기 영양제 품절로 인한 구매 전환율 하락 방지
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
                  재고 회전 일수 38일 → 24일
                </div>
              </div>
            </div>

            {/* Category 4 */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col">
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                  alt="홈리빙 및 생활 수납 잡화"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  평균 420 SKU
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">홈리빙 · 생활잡화</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    부피가 큰 파렛트 단위 상품의 창고 체류 기간을 줄여 매월 3PL 풀필먼트 보관료 34% 절감
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
                  월 보관비용 62만 원 영구 절감
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILOT_CASE_METRICS.quotes.map((q, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{q.text}"
                </p>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{q.author}</div>
                  <div className="text-[11px] text-slate-500">{q.store}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>실제 도입 고객사</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

