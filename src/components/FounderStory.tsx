import React from 'react';
import { Warehouse, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';

export const FounderStory: React.FC = () => {
  return (
    <section id="founder" className="py-14 sm:py-20 bg-white border-b border-slate-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
              <Warehouse className="h-3.5 w-3.5 text-indigo-600" />
              <span>창업 이야기</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              "책상이 아니라, <br className="hidden sm:inline" />
              7년 동안 물류창고에서 겪은 고통으로 <br />
              <span className="text-indigo-600">직접 만든 솔루션입니다"</span>
            </h2>

            <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                네이버 스마트스토어와 쿠팡에서 반려동물 용품 브랜드(288개 상품)를 7년간 직접 운영했습니다. 매주 월요일마다 엑셀을 켜고 이번 주에 무엇을 얼마나 발주해야 할지 고민했습니다.
              </p>
              <p>
                막히는 지점은 언제나 같았습니다. <strong>잘 팔리는 인기 상품은 입고 일정을 못 맞춰 늘 품절</strong>되고, 반대로 안 팔리는 상품에는 소중한 사업 자금이 창고에 몇 달씩 묶였습니다.
              </p>
              <p>
                기존 ERP나 주문 수집 솔루션은 송장을 뽑고 재고 수량을 기록하는 데는 좋았지만, <em>"이번 주 한정된 예산 1,000만 원으로 어떤 상품을 몇 개 사야 하는지"</em>는 아무도 계산해주지 않았습니다.
              </p>
              <div className="font-medium text-slate-800 bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-600">
                "결국 내 스토어의 현금 흐름을 지키기 위해 이 계산 프로그램을 직접 코딩했습니다. 우리 회사가 쓰면서 품절률이 80% 이상 줄어들었고, 같은 고민을 겪는 이커머스 대표님들과 나누고자 Replenix를 세상에 내놓게 되었습니다."
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Warehouse className="h-4 w-4 text-slate-600" />
                <span>288개 SKU 물류창고 직접 운영</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-slate-600" />
                <span>풀필먼트 물류비 실무 반영</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="h-4 w-4 text-slate-600" />
                <span>80여 개 스토어 대표 심층 인터뷰</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Warehouse Photo & Key Insight Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Warehouse Real Photography Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="이커머스 물류창고 및 출고 현장"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white mb-1">
                    <Warehouse className="h-3 w-3" />
                    <span>실제 운영 경험</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100">
                    288개 상품의 입출고와 매주 품절을 직접 겪었던 물류 현장
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                <span>현장에서 확인한 3대 비효율 진실</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="rounded-lg bg-white p-3.5 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    1. 감(직관)에 의존한 발주는 한계가 있습니다
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    담당자의 직감에 의존한 발주는 주문량이 늘어날수록 실수와 결품 손실을 피하기 어렵습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3.5 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    2. 품절과 과잉재고는 동시에 발생합니다
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    창고 구석에는 수개월 치 안 팔리는 재고가 쌓여있고, 효자 상품은 품절되어 고객을 놓칩니다.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3.5 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    3. 일반 엑셀은 '한정된 예산'을 풀지 못합니다
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    예산이 부족할 때 어떤 상품을 먼저 사고 무엇을 미뤄야 할지 엑셀 수식은 답을 주지 못합니다.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-200 text-center">
                <span className="text-[11px] text-slate-500">
                  Replenix는 이 세 가지 문제를 <strong>정확한 수식과 알고리즘</strong>으로 해결합니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

