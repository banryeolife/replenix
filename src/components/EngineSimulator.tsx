import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Download, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Search,
  FileSpreadsheet,
  Building2,
  Copy,
  Info,
  LineChart as ChartIcon,
  ArrowRight
} from 'lucide-react';
import { TENANT_PRESETS } from '../data/mockData';
import { StrategyMode, SKUItem } from '../types';
import { runOptimization } from '../utils/optimizer';
import { StockoutTimelineChart } from './StockoutTimelineChart';

export const EngineSimulator: React.FC = () => {
  const [selectedTenantId, setSelectedTenantId] = useState<string>('petco');
  const [strategy, setStrategy] = useState<StrategyMode>('balanced');
  const [budget, setBudget] = useState<number>(8500000);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'chart' | 'po_preview'>('table');
  const [chartSelectedSkuId, setChartSelectedSkuId] = useState<string>('');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentTenant = useMemo(() => {
    return TENANT_PRESETS.find((t) => t.id === selectedTenantId) || TENANT_PRESETS[0];
  }, [selectedTenantId]);

  const handleTenantChange = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    const tenant = TENANT_PRESETS.find((t) => t.id === tenantId);
    if (tenant) {
      setBudget(tenant.defaultBudget);
    }
  };

  const { updatedItems, results } = useMemo(() => {
    return runOptimization(currentTenant.items, budget, strategy);
  }, [currentTenant, budget, strategy]);

  const budgetUsagePercent = Math.min(100, Math.round((results.spentBudget / results.totalBudget) * 100));

  // Filter items by status and search query
  const filteredItems = useMemo(() => {
    return updatedItems.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterUrgency === 'all') return true;
      if (filterUrgency === 'critical') return item.urgency === 'critical';
      if (filterUrgency === 'warning') return item.urgency === 'warning';
      if (filterUrgency === 'safe') return item.urgency === 'safe';
      if (filterUrgency === 'overstock') return item.urgency === 'overstock';
      return true;
    });
  }, [updatedItems, filterUrgency, searchQuery]);

  // Real CSV Download with UTF-8 BOM for Excel
  const handleDownloadCSV = () => {
    const headers = ['관리코드', '상품명', '카테고리', '공급단가', '현재고', '일일판매량', '리드타임(일)', '품절예상(일)', '추천발주량(개)', '발주금액(원)', '판단사유'];
    const rows = updatedItems.map((item) => [
      item.code,
      `"${item.name.replace(/"/g, '""')}"`,
      item.category,
      item.unitCost,
      item.currentStock,
      item.dailyVelocity,
      item.leadTimeDays,
      item.stockoutRiskDays,
      item.allocatedQty,
      item.totalAmount,
      `"${item.reason.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `replenix_발주서_${selectedTenantId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleCopyPO = () => {
    const poLines = updatedItems
      .filter((item) => item.allocatedQty > 0)
      .map((item, idx) => `${idx + 1}. [${item.code}] ${item.name} - ${item.allocatedQty}개 (단가: ${item.unitCost.toLocaleString()}원 / 합계: ${item.totalAmount.toLocaleString()}원)`)
      .join('\n');
    
    const textToCopy = `[Replenix 주간 발주서]\n총 발주금액: ${results.spentBudget.toLocaleString()}원 (${results.orderedItemsCount}개 품목)\n\n${poLines}`;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <section id="simulator" className="py-12 md:py-20 bg-slate-50 border-b border-slate-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-200/80 px-3 py-1 rounded-full mb-2">
              <Calculator className="h-3.5 w-3.5 text-indigo-600" />
              <span>실시간 발주 수량 계산기</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              이번 주 내 예산 안에서, <br className="sm:hidden" />
              <span className="text-indigo-600">무엇을 몇 개 사야 할까?</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
              스토어 예산과 발주 전략을 조정해 보세요.
              상품별 판매 속도, 리드타임, 마진율을 계산하여 최적의 발주 수량을 실시간으로 배분합니다.
            </p>
          </div>

          {/* Preset Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              스토어 예시:
            </span>
            {TENANT_PRESETS.map((tenant) => (
              <button
                key={tenant.id}
                id={`btn-tenant-${tenant.id}`}
                onClick={() => handleTenantChange(tenant.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedTenantId === tenant.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tenant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Control Box */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Budget Slider */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="budget-slider" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>이번 주 가용 발주 예산</span>
                </label>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900">
                    {budget.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">원</span>
                </div>
              </div>

              <input
                id="budget-slider"
                type="range"
                min="3000000"
                max="25000000"
                step="500000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />

              {/* Quick Budget Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 mr-1">빠른 설정:</span>
                {[5000000, 8500000, 15000000, 25000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBudget(amount)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                      budget === amount
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {(amount / 10000).toLocaleString()}만원
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Strategy Mode Selector */}
            <div className="lg:col-span-6 space-y-2">
              <div className="text-xs font-semibold text-slate-700">
                <span>발주 운영 전략</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  id="strategy-balanced"
                  onClick={() => setStrategy('balanced')}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                    strategy === 'balanced'
                      ? 'bg-indigo-50/70 text-indigo-900 border-indigo-400 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">균형 추천 (표준)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">품절 방지와 회전율의 균형</div>
                </button>

                <button
                  id="strategy-sales-max"
                  onClick={() => setStrategy('sales_max')}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                    strategy === 'sales_max'
                      ? 'bg-indigo-50/70 text-indigo-900 border-indigo-400 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">품절 방지 우선</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">성수기 대비 안전재고 확대</div>
                </button>

                <button
                  id="strategy-cash-defense"
                  onClick={() => setStrategy('cash_defense')}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                    strategy === 'cash_defense'
                      ? 'bg-indigo-50/70 text-indigo-900 border-indigo-400 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">현금 절약 우선</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">당장 급한 최소 수량만 발주</div>
                </button>
              </div>
            </div>
          </div>

          {/* Results KPI Summary - Clean, light, high-contrast cards */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="text-xs font-medium text-slate-500">예산 집행률</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {results.spentBudget.toLocaleString()}원
                <span className="text-xs text-indigo-600 ml-1.5 font-normal">
                  ({budgetUsagePercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${budgetUsagePercent}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span>방어된 예상 매출</span>
              </div>
              <div className="text-lg font-bold text-emerald-700 mt-1">
                +{results.preventedLostSales.toLocaleString()}원
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                품절 임박 {results.criticalItemsCount}개 상품 결품 방지
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-700" />
                <span>과잉 발주 차단</span>
              </div>
              <div className="text-lg font-bold text-slate-800 mt-1">
                +{results.capitalTiedUpSaved.toLocaleString()}원
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                재고 과다 품목 자동 발주 보류
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-200/80">
              <div className="text-xs font-medium text-slate-500">
                <span>발주 추천 대상</span>
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {results.orderedItemsCount}개 품목
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                총 {currentTenant.items.length}개 SKU 중 최적 선별
              </div>
            </div>
          </div>
        </div>

        {/* View Tabs & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              상품별 발주 추천 목록 ({updatedItems.length})
            </button>
            <button
              id="tab-chart"
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'chart'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ChartIcon className="h-3.5 w-3.5 text-indigo-600" />
              <span>품절 위험 & 발주 시점 차트</span>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            </button>
            <button
              onClick={() => setActiveTab('po_preview')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'po_preview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-600" />
              <span>공급사용 발주서 양식</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-po"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 active:scale-95 transition-all"
            >
              {downloadSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>발주서 엑셀 다운로드 완료!</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>발주서 엑셀(CSV) 다운로드</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Critical Alert Bar in Table View */}
        {activeTab === 'table' && results.criticalItemsCount > 0 && (
          <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-rose-50/90 border border-rose-200/90 rounded-xl px-4 py-2.5 text-xs text-rose-900">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 shrink-0" />
              <span>
                <strong>{results.criticalItemsCount}개 품목</strong>의 현재고가 리드타임보다 적어 즉시 발주가 필요합니다.
              </span>
            </div>
            <button
              onClick={() => {
                const firstCrit = updatedItems.find(i => i.urgency === 'critical');
                if (firstCrit) setChartSelectedSkuId(firstCrit.id);
                setActiveTab('chart');
              }}
              className="font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 shrink-0"
            >
              <span>재고 소진 & 발주 시점 차트 보기</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Filters and Search */}
        {activeTab === 'table' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium mr-1">상태별:</span>
              {[
                { id: 'all', label: '전체' },
                { id: 'critical', label: '품절 위험 (3일 내)' },
                { id: 'warning', label: '주의 (7일 내)' },
                { id: 'safe', label: '안정' },
                { id: 'overstock', label: '과잉재고' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterUrgency(f.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                    filterUrgency === f.id
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="상품명 또는 코드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
        )}

        {/* SKU Decision Table */}
        {activeTab === 'table' ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-[11px] font-semibold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="py-3 px-4">상품명 / 관리코드</th>
                    <th scope="col" className="py-3 px-3 text-center">리드타임</th>
                    <th scope="col" className="py-3 px-3 text-right">현재고</th>
                    <th scope="col" className="py-3 px-3 text-right">일일판매량</th>
                    <th scope="col" className="py-3 px-3 text-center">품절 예상</th>
                    <th scope="col" className="py-3 px-3 text-right font-bold text-indigo-700 bg-indigo-50/50">
                      추천 발주 수량
                    </th>
                    <th scope="col" className="py-3 px-3 text-right">발주 금액</th>
                    <th scope="col" className="py-3 px-4">추천 사유</th>
                    <th scope="col" className="py-3 px-3 text-center">시점 분석</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.urgency === 'critical' ? 'bg-rose-50/30' : item.urgency === 'overstock' ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                          <span className="font-mono">{item.code}</span>
                          <span className="text-slate-400">•</span>
                          <span>{item.category}</span>
                          <span className="text-slate-400">•</span>
                          <span>마진 {item.marginRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {item.leadTimeDays}일
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">
                        {item.currentStock.toLocaleString()}개
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700">
                        {item.dailyVelocity}개
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            item.urgency === 'critical'
                              ? 'bg-rose-100 text-rose-700'
                              : item.urgency === 'warning'
                              ? 'bg-amber-100 text-amber-700'
                              : item.urgency === 'overstock'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {item.urgency === 'overstock' ? '과잉재고 (60일+)' : `${item.stockoutRiskDays}일 후`}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold bg-indigo-50/40">
                        <span className={item.allocatedQty > 0 ? 'text-indigo-700 text-sm font-bold' : 'text-slate-400'}>
                          {item.allocatedQty.toLocaleString()}개
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-900">
                        {item.totalAmount > 0 ? `${item.totalAmount.toLocaleString()}원` : '-'}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 max-w-xs leading-relaxed">
                        {item.reason}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => {
                            setChartSelectedSkuId(item.id);
                            setActiveTab('chart');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all"
                          title="재고 소진 및 발주 시점 인터랙티브 차트 확인"
                        >
                          <ChartIcon className="h-3 w-3" />
                          <span>차트</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        선택한 조건에 해당하는 상품이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'chart' ? (
          /* Stockout & Reorder Timing Chart Tab */
          <StockoutTimelineChart
            items={updatedItems}
            selectedItemId={chartSelectedSkuId}
            onSelectItem={(id) => setChartSelectedSkuId(id)}
          />
        ) : (
          /* PO Preview Tab */
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-4 gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">공급사 전달용 주간 정규 발주서</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  발주 수량이 배분된 상품 목록입니다. 바로 복사하거나 엑셀로 내려받을 수 있습니다.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPO}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copySuccess ? '복사되었습니다!' : '내용 복사'}</span>
                </button>
                <button
                  onClick={handleDownloadCSV}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>엑셀(CSV) 저장</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {updatedItems
                .filter((item) => item.allocatedQty > 0)
                .map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono w-5">#{idx + 1}</span>
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.code} | 단가: {item.unitCost.toLocaleString()}원</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-2 sm:mt-0 font-mono">
                      <div>
                        <span className="text-[11px] text-slate-500 mr-1.5">발주 수량:</span>
                        <strong className="text-indigo-700 text-sm font-bold">{item.allocatedQty}개</strong>
                      </div>
                      <div className="w-28 text-right">
                        <span className="text-[11px] text-slate-500 block">합계</span>
                        <span className="text-slate-900 font-bold">{item.totalAmount.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">총 발주 공급가액 ({results.orderedItemsCount}개 품목)</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {results.spentBudget.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footnote */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-slate-400" />
            단순 수식 산출이 아닌, <strong>리드타임 지연 위험</strong>과 <strong>예산 한도 내 마진율</strong>을 고려한 실질적 추천 결과입니다.
          </span>
          <span className="hidden sm:inline text-slate-400">
            주간 단위 발주서 즉시 발행 가능
          </span>
        </div>
      </div>
    </section>
  );
};

