import React, { useState, useMemo } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  PackageX, 
  Clock, 
  Layers, 
  Coins,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface WorkingCapitalSummaryCardProps {
  onExploreSimulator?: () => void;
}

interface StoreScalePreset {
  id: string;
  label: string;
  monthlyRevenue: number; // in KRW
  description: string;
}

const STORE_PRESETS: StoreScalePreset[] = [
  { id: 'scale-30m', label: '월 3,000만 원', monthlyRevenue: 30000000, description: '초기 성장 셀러 (SKU 30~50개)' },
  { id: 'scale-80m', label: '월 8,000만 원', monthlyRevenue: 80000000, description: '성장 D2C 브랜드 (SKU 80~150개)' },
  { id: 'scale-150m', label: '월 1억 5,000만 원', monthlyRevenue: 150000000, description: '멀티채널 전문 몰 (SKU 150~300개)' },
  { id: 'scale-300m', label: '월 3억 원', monthlyRevenue: 300000000, description: '탑티어 옴니채널 (SKU 300개 이상)' },
];

export const WorkingCapitalSummaryCard: React.FC<WorkingCapitalSummaryCardProps> = ({ 
  onExploreSimulator 
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('scale-80m');
  const [customRevenue, setCustomRevenue] = useState<number>(80000000);

  // When preset clicked
  const handlePresetSelect = (preset: StoreScalePreset) => {
    setSelectedPresetId(preset.id);
    setCustomRevenue(preset.monthlyRevenue);
  };

  // When custom slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCustomRevenue(val);
    const matched = STORE_PRESETS.find(p => p.monthlyRevenue === val);
    setSelectedPresetId(matched ? matched.id : 'custom');
  };

  // Financial model calculations
  const calculations = useMemo(() => {
    const annualRevenue = customRevenue * 12;

    // 1. Annual Cost Savings (비용 절감액)
    // - Warehouse / 3PL storage fee savings: ~0.8% of revenue through CBM reduction & dead stock elimination
    const storageSavings = Math.round(annualRevenue * 0.0078);
    // - Capital cost & depreciation/spoilage prevention: ~1.4% of revenue by releasing locked-up working capital
    const capitalCostSavings = Math.round(annualRevenue * 0.0135);
    // - Labor / order management time saved: 5.2 hrs/wk = ~260 hrs/year * hourly equivalent (approx 6M - 12M scale-dependent)
    const laborSavings = Math.round(5200000 + (annualRevenue * 0.0018));
    const totalCostSavings = storageSavings + capitalCostSavings + laborSavings;

    // 2. Annual Revenue Contribution (매출 기여도)
    // - Direct lost sales recovered by preventing stockouts: ~4.6% of annual revenue (from stockout rate dropping 14.8% -> 2.1%)
    const stockoutRecoveryRevenue = Math.round(annualRevenue * 0.046);
    // - Search rank & SEO preservation + repeat customer retention: ~2.4% of annual revenue
    const rankingProtectionRevenue = Math.round(annualRevenue * 0.024);
    // - High-margin reallocation revenue boost: ~1.2% of annual revenue
    const marginReallocationRevenue = Math.round(annualRevenue * 0.012);
    const totalRevenueContribution = stockoutRecoveryRevenue + rankingProtectionRevenue + marginReallocationRevenue;

    // Total Financial Impact
    const totalFinancialImpact = totalCostSavings + totalRevenueContribution;

    // Proportions for visual ratio
    const costSavingsRatio = Math.round((totalCostSavings / totalFinancialImpact) * 100);
    const revenueContributionRatio = 100 - costSavingsRatio;

    // Average annual Replenix Growth plan cost (249,000 * 12 = ~2,988,000 KRW)
    const annualToolCost = 2988000;
    const estimatedRoi = Math.round(totalFinancialImpact / annualToolCost);

    return {
      annualRevenue,
      storageSavings,
      capitalCostSavings,
      laborSavings,
      totalCostSavings,
      stockoutRecoveryRevenue,
      rankingProtectionRevenue,
      marginReallocationRevenue,
      totalRevenueContribution,
      totalFinancialImpact,
      costSavingsRatio,
      revenueContributionRatio,
      estimatedRoi,
    };
  }, [customRevenue]);

  const formatManWon = (amount: number) => {
    const man = Math.round(amount / 10000);
    if (man >= 10000) {
      const eok = (man / 10000).toFixed(1).replace(/\.0$/, '');
      return `${eok}억`;
    }
    return `${man.toLocaleString()}만`;
  };

  return (
    <section id="working-capital-summary" className="py-12 sm:py-16 bg-white border-b border-slate-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 md:p-10 shadow-sm">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-3 py-1 rounded-full mb-3">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>운전자본 최적화 기대효과 (Working Capital Summary)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                운전자본을 최적화하면 <br className="sm:hidden" />
                <span className="text-indigo-600">얼마나 절감되고 매출이 늘어날까요?</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                창고에 잠긴 과잉 재고를 줄여 <strong>불필요한 보관료·금융비용을 아끼고</strong>, 
                핵심 상품의 품절을 원천 차단해 <strong>기회매출을 전액 회수</strong>합니다.
              </p>
            </div>

            {/* Interactive Scale Adjuster */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs w-full lg:w-auto min-w-[320px]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600" />
                  스토어 월 매출 기준:
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {formatManWon(customRevenue)}원/월
                </span>
              </div>

              {/* Slider */}
              <input
                id="working-capital-revenue-slider"
                type="range"
                min="20000000"
                max="300000000"
                step="10000000"
                value={customRevenue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />

              {/* Quick Presets */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                {STORE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    id={`btn-scale-${p.id}`}
                    onClick={() => handlePresetSelect(p)}
                    className={`px-1.5 py-1 text-[11px] rounded font-medium border text-center transition-colors truncate ${
                      selectedPresetId === p.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title={p.description}
                  >
                    {p.label.replace('월 ', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visualization Grid: Cost Savings vs Revenue Contribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            
            {/* Card 1: Annual Cost Savings (연간 비용 절감액) */}
            <div id="summary-card-cost-savings" className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                      <PiggyBank className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-indigo-700 tracking-wider uppercase">
                        Cost Reduction
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        연간 비용 절감액
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    지출 낭비 차단
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                    +{formatManWon(calculations.totalCostSavings)}원
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / 연간 누적 절감
                  </span>
                </div>

                {/* Visual Breakdown Meters */}
                <div className="space-y-4 pt-1">
                  {/* Item 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-indigo-500" />
                        3PL 보관료 및 창고 CBM 절감
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.storageSavings)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.storageSavings / calculations.totalCostSavings) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">부피 큰 과잉 재고의 분할 발주로 매월 나가는 파렛트 보관료 34% 감소</p>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Coins className="h-3.5 w-3.5 text-indigo-500" />
                        잠긴 운전자본 회수 & 감모/금융비용 방지
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.capitalCostSavings)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.capitalCostSavings / calculations.totalCostSavings) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">안 팔리는 악성 재고의 발주를 막아 묶인 현금 회수 및 대출이자·폐기 손실 방어</p>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        주간 발주 엑셀 수작업 공수 절감
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.laborSavings)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-400 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.laborSavings / calculations.totalCostSavings) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">매주 5~6시간 걸리던 피벗 분석을 파일 드롭 한 번으로 3분 내 단축</p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  실제 84개 스토어 평균 28.4% 자본 회수 실측
                </span>
                <span className="font-semibold text-indigo-600">
                  월평균 {formatManWon(calculations.totalCostSavings / 12)}원 절감
                </span>
              </div>
            </div>

            {/* Card 2: Annual Revenue Contribution (연간 매출 기여도) */}
            <div id="summary-card-revenue-contribution" className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                        Revenue Uplift
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        연간 추가 매출 기여도
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    기회매출 전액 방어
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight font-mono">
                    +{formatManWon(calculations.totalRevenueContribution)}원
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / 연간 추가 매출 기여
                  </span>
                </div>

                {/* Visual Breakdown Meters */}
                <div className="space-y-4 pt-1">
                  {/* Item 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        핵심 효자 상품 결품(품절) 방지 기회매출
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.stockoutRecoveryRevenue)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.stockoutRecoveryRevenue / calculations.totalRevenueContribution) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">리드타임 지연 및 성수기 수요 급증 버퍼를 계산하여 품절률 14.8% → 2.1% 개선</p>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <PackageX className="h-3.5 w-3.5 text-emerald-600" />
                        스마트스토어/쿠팡 랭킹 지수 & 재구매 보존
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.rankingProtectionRevenue)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500/85 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.rankingProtectionRevenue / calculations.totalRevenueContribution) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">품절로 인한 쇼핑검색 노출 순위 급락과 광고비 낭비를 사전에 영구 차단</p>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        회수된 자본의 고마진 상품 재투자 수익
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        +{formatManWon(calculations.marginReallocationRevenue)}원
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((calculations.marginReallocationRevenue / calculations.totalRevenueContribution) * 100))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">과잉재고에서 풀려난 현금을 공헌이익 60%+ 고마진 라인업에 집중 배분</p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  품절 방지 알고리즘 적용 시 결품률 86% 감소
                </span>
                <span className="font-semibold text-emerald-600">
                  월평균 {formatManWon(calculations.totalRevenueContribution / 12)}원 기여
                </span>
              </div>
            </div>

          </div>

          {/* Visual Ratio & Net Financial Impact Banner */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
            {/* Visual Proportion Bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  비용 절감 기여 ({calculations.costSavingsRatio}%)
                </span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  매출 증대 기여 ({calculations.revenueContributionRatio}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full flex overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${calculations.costSavingsRatio}%` }}
                  title={`비용 절감: ${formatManWon(calculations.totalCostSavings)}원`}
                />
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${calculations.revenueContributionRatio}%` }}
                  title={`매출 기여: ${formatManWon(calculations.totalRevenueContribution)}원`}
                />
              </div>
            </div>

            {/* Bottom Total Result Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  운전자본 최적화 연간 총 재무 가치 창출 (Net Annual Value)
                </div>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    +{formatManWon(calculations.totalFinancialImpact)}원
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                    솔루션 도입 비용 대비 약 {calculations.estimatedRoi}배 ROI
                  </span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex items-center gap-3">
                <a
                  href="#simulator"
                  id="btn-summary-to-simulator"
                  onClick={onExploreSimulator}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
                >
                  <span>내 스토어 SKU로 직접 계산해보기</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
