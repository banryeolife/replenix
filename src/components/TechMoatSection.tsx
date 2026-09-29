import React from 'react';
import { Layers, CheckCircle2, XCircle, TrendingUp, Clock, Wallet } from 'lucide-react';
import { ERP_VS_REPLENIX_COMPARISON } from '../data/mockData';

export const TechMoatSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white border-b border-slate-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
            <Layers className="h-3.5 w-3.5 text-indigo-600" />
            <span>발주 계산 원리</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            매주 반복되는 발주 고민, <br />
            <span className="text-indigo-600">Replenix는 3단계로 풀어냅니다</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            엑셀 시트에서 감으로 수량을 정하거나, 갑작스러운 품절로 매출을 놓치지 마세요.
            판매 속도, 입고 소요일, 예산 한도를 함께 고려해 최적 수량을 산출합니다.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 mb-3.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 tracking-wider">STEP 1</span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                실시간 판매 속도 파악
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                최근 7일/30일 주문 데이터를 분석하여 각 상품이 매일 몇 개씩 팔리고 있는지 파악하고, 현재 재고가 며칠 뒤 소진되는지 정확히 계산합니다.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
              ✓ 기획전·반짝 급증 주문 필터링
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 mb-3.5">
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 tracking-wider">STEP 2</span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                공급사 리드타임 역산
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                공장 제작 및 통관·배송에 걸리는 일수(리드타임)와 최소 주문수량(MOQ)을 반영하여, 품절이 발생하기 전에 정확한 시점에 입고되도록 유도합니다.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
              ✓ 공급사별 납기 지연 버퍼 자동 반영
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-5 flex flex-col justify-between hover:border-indigo-300 transition-colors">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white mb-3.5">
                <Wallet className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold text-indigo-700 tracking-wider">STEP 3</span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                가용 예산 내 우선순위 배분
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                예산이 부족할 때 모든 상품을 다 살 수 없습니다. 마진율이 높고 품절 시 손실이 큰 핵심 상품부터 예산을 우선 배분하여 순이익을 지킵니다.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-indigo-200/60 text-[11px] text-indigo-800 font-medium">
              ✓ 예산 한도 내 매출 기여도 극대화
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/80">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                기존 업무 방식과 무엇이 다른가요?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ERP는 과거를 기록하고, 사방넷은 주문을 모읍니다. Replenix는 다음 주에 몇 개를 발주해야 할지 알려줍니다.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-[11px] font-semibold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">비교 항목</th>
                  <th className="py-3 px-4">기존 ERP / 주문수집 툴</th>
                  <th className="py-3 px-4">수동 엑셀 계산</th>
                  <th className="py-3 px-4 text-indigo-700 font-bold bg-indigo-50/60">
                    Replenix
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ERP_VS_REPLENIX_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{row.erp}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{row.excel}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-indigo-900 bg-indigo-50/30">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.replenix}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

