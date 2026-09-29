import React from 'react';
import { ArrowDown, Calculator, ArrowRight, CheckCircle2, Clock, TrendingDown, RefreshCw } from 'lucide-react';

interface HeroProps {
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 bg-white border-b border-slate-200">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Practical tag badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100/80 px-3.5 py-1 text-xs font-medium text-slate-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>이커머스 셀러와 D2C 브랜드를 위한 실무 발주 솔루션</span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[54px] leading-tight sm:leading-tight">
            남는 재고는 줄이고, 품절은 막는 <br className="hidden sm:inline" />
            <span className="text-indigo-600">스마트 발주 수량 계산기</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            엑셀 수식과 감에 의존하던 발주 업무를 단순화합니다.
            상품별 일일 판매량, 공급사 리드타임, 이번 주 가용 예산만 넣으면
            <strong className="text-slate-800 font-semibold"> 어떤 상품을 몇 개 사야 가장 이익인지</strong> 즉시 계산해 드립니다.
          </p>

          {/* Direct CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#simulator"
              id="hero-cta-simulator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-slate-800 active:scale-95 transition-all"
            >
              <Calculator className="h-4 w-4" />
              <span>실시간 발주 계산기 체험</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <button
              onClick={onOpenAudit}
              id="hero-cta-audit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all"
            >
              <span>우리 스토어 잠긴 재고 진단</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Friction Killers */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              가입 없이 즉시 테스트 가능
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              스마트스토어 / 쿠팡 / 사방넷 엑셀 양식 호환
            </span>
          </div>

          {/* Software Preview Window with Authentic Logistics Imagery */}
          <div className="mt-10 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden text-left">
            {/* Window Header Bar */}
            <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 ml-2 hidden sm:inline">
                  https://app.replenix.ai/orders/weekly-optimizer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  실시간 최적화 엔진 준비 완료
                </span>
              </div>
            </div>

            {/* Window Body: Image + Live Optimization Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Authentic Warehouse & Stock Operation Photo */}
              <div className="lg:col-span-5 relative h-56 lg:h-auto min-h-[220px]">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80"
                  alt="이커머스 물류창고 패키징 및 재고 관리"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider mb-1">
                    Warehouse Real-Time Sync
                  </span>
                  <div className="text-sm font-bold">
                    재고 데이터와 현금 한도가 실시간으로 연결됩니다
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    주문 수집 프로그램(사방넷/플레이오토) 엑셀을 그대로 불러와 다음 주 발주량을 수식으로 확정합니다.
                  </p>
                </div>
              </div>

              {/* Right Column: Actual Simulated Snapshot Card */}
              <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        이번 주 가용 발주 예산: 1,500만 원
                      </div>
                      <div className="text-[11px] text-slate-500">
                        공급사별 납기 지연 버퍼 및 마진율 가중치 자동 계산
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      예산 집행률 99.3%
                    </span>
                  </div>

                  {/* Sample Item Rows */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <div>
                          <div className="font-semibold text-slate-900">[식품] 프리미엄 닭가슴살 큐브 100g</div>
                          <div className="text-[10px] text-slate-500">현재고 85개 · 소진까지 3.2일 (품절 임박)</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600 font-mono">+420개 발주</div>
                        <div className="text-[10px] text-slate-500">210만 원 배분</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <div>
                          <div className="font-semibold text-slate-900">[위생] 저자극 대용량 배변패드 50매</div>
                          <div className="text-[10px] text-slate-500">현재고 210개 · 리드타임 14일 고려</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600 font-mono">+350개 발주</div>
                        <div className="text-[10px] text-slate-500">315만 원 배분</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <div>
                          <div className="font-semibold text-slate-900">[간식] 저염 북어포 트릿 200g</div>
                          <div className="text-[10px] text-slate-500">안전재고 확보 완료 · 마진율 42%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600 font-mono">+180개 발주</div>
                        <div className="text-[10px] text-slate-500">144만 원 배분</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    아래 시뮬레이터에서 내 스토어 조건으로 직접 조절할 수 있습니다.
                  </span>
                  <a
                    href="#simulator"
                    className="font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>직접 계산해보기</span>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Metrics Strip - Clean, high contrast */}
          <div className="mt-12 w-full max-w-4xl rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <div className="flex flex-col items-center justify-center px-4 pt-1 sm:pt-0">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <Clock className="h-3.5 w-3.5 text-indigo-600" />
                  <span>주간 발주 소요 시간</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  6시간 → 25분
                </div>
                <div className="text-xs text-slate-500 mt-0.5">반복 엑셀 작업 92% 단축</div>
              </div>

              <div className="flex flex-col items-center justify-center px-4 pt-4 sm:pt-0">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                  <span>품절(결품) 발생률</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  14.8% → 2.1%
                </div>
                <div className="text-xs text-slate-500 mt-0.5">인기 상품 품절 방어로 매출 방어</div>
              </div>

              <div className="flex flex-col items-center justify-center px-4 pt-4 sm:pt-0">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                  <RefreshCw className="h-3.5 w-3.5 text-emerald-600" />
                  <span>재고 보유 일수 (회전)</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  42일 → 26일
                </div>
                <div className="text-xs text-slate-500 mt-0.5">창고에 잠긴 운전자본 조기 회수</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

