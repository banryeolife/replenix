import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SKUItem } from '../types';

interface StockoutTimelineChartProps {
  items: SKUItem[];
  selectedItemId?: string;
  onSelectItem?: (itemId: string) => void;
}

export const StockoutTimelineChart: React.FC<StockoutTimelineChartProps> = ({
  items,
  selectedItemId,
  onSelectItem,
}) => {
  // Fallback to first critical or first item
  const initialItemId = useMemo(() => {
    if (selectedItemId) return selectedItemId;
    const critical = items.find((i) => i.urgency === 'critical');
    return critical ? critical.id : items[0]?.id;
  }, [items, selectedItemId]);

  const [activeItemId, setActiveItemId] = useState<string>(initialItemId);
  const [delayDays, setDelayDays] = useState<number>(0); // 발주 지연 시뮬레이션 (0일, 3일, 7일)

  // Sync with prop if it changes
  React.useEffect(() => {
    if (selectedItemId && selectedItemId !== activeItemId) {
      setActiveItemId(selectedItemId);
    }
  }, [selectedItemId]);

  const selectedItem = useMemo(() => {
    return items.find((i) => i.id === activeItemId) || items[0];
  }, [items, activeItemId]);

  const handleItemChange = (id: string) => {
    setActiveItemId(id);
    if (onSelectItem) {
      onSelectItem(id);
    }
  };

  // Calculations for current selected item
  const calculations = useMemo(() => {
    if (!selectedItem) return null;

    const S0 = selectedItem.currentStock;
    const v = Math.max(1, selectedItem.dailyVelocity);
    const L = selectedItem.leadTimeDays;
    const Q = selectedItem.allocatedQty > 0 ? selectedItem.allocatedQty : selectedItem.recommendedQty;

    // Days until stockout without reorder
    const exactStockoutDays = Number((S0 / v).toFixed(1));
    const stockoutDayInt = Math.floor(exactStockoutDays);

    // Safety stock: 3 days of velocity
    const safetyStock = Math.round(v * 3);

    // Reorder Point (ROP): Lead time demand + Safety stock
    const reorderPointQty = Math.round(v * L + safetyStock);

    // Optimal Reorder Timing:
    // Order needs to be placed before: current stock reaches ROP
    // Days until reorder must be placed: exactStockoutDays - L
    const daysUntilReorderNeeded = Number((exactStockoutDays - L).toFixed(1));

    // When the order actually arrives with delayDays added:
    // If order placed at Day (delayDays), arrival is at Day (delayDays + L)
    const arrivalDay = delayDays + L;

    // Stockout duration during lead time if any
    let stockoutDurationDays = 0;
    if (arrivalDay > exactStockoutDays) {
      stockoutDurationDays = Number((arrivalDay - exactStockoutDays).toFixed(1));
    }

    // Lost revenue during stockout gap
    const lostRevenue = Math.round(stockoutDurationDays * v * selectedItem.sellingPrice);

    return {
      S0,
      v,
      L,
      Q,
      exactStockoutDays,
      stockoutDayInt,
      safetyStock,
      reorderPointQty,
      daysUntilReorderNeeded,
      arrivalDay,
      stockoutDurationDays,
      lostRevenue,
    };
  }, [selectedItem, delayDays]);

  // Generate 30-day projection data for Recharts
  const chartData = useMemo(() => {
    if (!calculations || !selectedItem) return [];

    const { S0, v, L, Q, arrivalDay, safetyStock } = calculations;
    const data = [];
    const totalDays = 30;

    for (let d = 0; d <= totalDays; d++) {
      // 1. Without Reorder: linear depletion to 0
      const noOrderStock = Math.max(0, Math.round(S0 - v * d));

      // 2. With Replenix Reorder:
      // Until arrivalDay: S0 - v * d (or 0 if exhausted)
      // At and after arrivalDay: Remaining stock + Q - v * (d - arrivalDay)
      let reorderStock = 0;
      if (d < arrivalDay) {
        reorderStock = Math.max(0, Math.round(S0 - v * d));
      } else {
        const stockAtArrival = Math.max(0, Math.round(S0 - v * arrivalDay));
        const afterArrival = stockAtArrival + Q - Math.round(v * (d - arrivalDay));
        reorderStock = Math.max(0, afterArrival);
      }

      data.push({
        day: d,
        label: d === 0 ? '오늘' : `D+${d}`,
        noOrderStock,
        reorderStock,
        safetyStock,
      });
    }

    return data;
  }, [calculations, selectedItem]);

  if (!selectedItem || !calculations) return null;

  const isAlreadyPastReorderPoint = calculations.daysUntilReorderNeeded <= 0;
  const willExperienceStockout = calculations.stockoutDurationDays > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Top Header & SKU Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Calendar className="h-3.5 w-3.5" />
              <span>재고 소진 & 최적 발주 시점 예측</span>
            </span>
            <span className="text-xs text-slate-500">
              향후 30일 시뮬레이션
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            언제 품절되고, 언제 발주해야 할까?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            상품별 일평균 판매량과 공급사 리드타임을 역산하여 정확한 발주 골든타임을 안내합니다.
          </p>
        </div>

        {/* Item Selector Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor="sku-selector" className="text-xs font-semibold text-slate-700 shrink-0">
            분석 대상 상품:
          </label>
          <select
            id="sku-selector"
            value={activeItemId}
            onChange={(e) => handleItemChange(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 max-w-xs"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                [{item.urgency === 'critical' ? '품절임박' : item.urgency === 'warning' ? '주의' : '안정'}] {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected SKU Quick Info Bar */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
        <div>
          <span className="text-[11px] text-slate-500 block">현재 창고 재고</span>
          <span className="text-base font-bold text-slate-900">
            {calculations.S0.toLocaleString()}개
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            일 {calculations.v}개씩 판매 중
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 block">품절 발생 가능 시점</span>
          <span className={`text-base font-bold ${calculations.exactStockoutDays <= 4 ? 'text-rose-600' : 'text-slate-900'}`}>
            D+{calculations.exactStockoutDays}일 후
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {calculations.exactStockoutDays <= 3 ? '🚨 품절 위험 매우 높음' : '재고 소진 예상일'}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 block">공급사 리드타임</span>
          <span className="text-base font-bold text-slate-900">
            {calculations.L}일 소요
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            발주 후 창고 입고까지
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 block">권장 발주 수량</span>
          <span className="text-base font-bold text-indigo-600 font-mono">
            +{calculations.Q.toLocaleString()}개
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            안전재고 {calculations.safetyStock}개 포함
          </span>
        </div>
      </div>

      {/* Critical Timing Insight Alert Banner */}
      <div className={`mt-4 rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isAlreadyPastReorderPoint
          ? 'bg-rose-50/80 border-rose-200 text-rose-900'
          : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
            isAlreadyPastReorderPoint ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
          }`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-2">
              <span>
                {isAlreadyPastReorderPoint
                  ? '🚨 최적 발주 골든타임 경과 (즉시 발주 필요)'
                  : `⏳ 최적 발주 시점: D-${Math.abs(calculations.daysUntilReorderNeeded)}일 후 권장`}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                isAlreadyPastReorderPoint ? 'bg-rose-200 text-rose-800' : 'bg-indigo-200 text-indigo-800'
              }`}>
                리드타임({calculations.L}일) 반영
              </span>
            </div>
            <p className="text-xs mt-1 text-slate-600 leading-relaxed">
              {isAlreadyPastReorderPoint ? (
                <>
                  현재 재고는 <strong>{calculations.exactStockoutDays}일</strong> 뒤 소진되지만 입고까지 <strong>{calculations.L}일</strong>이 걸립니다.{' '}
                  <span className="text-rose-700 font-semibold">
                    오늘 즉시 발주해도 입고 전까지 약 {calculations.stockoutDurationDays}일간 일시적 품절
                  </span>
                  이 발생할 수 있습니다. 지체 없이 즉시 발주서를 확정하세요!
                </>
              ) : (
                <>
                  현재고가 충분하여 <strong>{calculations.daysUntilReorderNeeded}일 후</strong> 발주해도 품절 없이 안전재고 기준선을 유지할 수 있습니다.{' '}
                  불필요하게 일찍 대량 발주하여 운전자본을 묶지 마세요.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Delay What-if Interactive Toggle */}
        <div className="shrink-0 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>만약 발주를 미룬다면?</span>
          </div>
          <div className="flex items-center gap-1">
            {[0, 3, 7].map((days) => (
              <button
                key={days}
                onClick={() => setDelayDays(days)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  delayDays === days
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {days === 0 ? '오늘 발주' : `+${days}일 지연`}
              </button>
            ))}
          </div>
          {delayDays > 0 && (
            <div className="text-[10px] text-rose-600 font-medium mt-1">
              품절 기간 +{delayDays}일 연장 / 예상 기회손실{' '}
              {(delayDays * calculations.v * selectedItem.sellingPrice).toLocaleString()}원
            </div>
          )}
        </div>
      </div>

      {/* Main Recharts Area / Line Chart */}
      <div className="mt-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="reorderStockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="noOrderStockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              
              <XAxis 
                dataKey="label" 
                stroke="#94a3b8" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
              />
              
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}개`}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const isStockout = data.noOrderStock === 0;
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                        <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-2">
                          {label} (일차: {data.day}일)
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-4 text-indigo-600 font-semibold">
                            <span>Replenix 발주 시 재고:</span>
                            <span className="font-mono">{data.reorderStock}개</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-rose-600">
                            <span>발주 미진행 시 재고:</span>
                            <span className="font-mono">
                              {data.noOrderStock}개 {isStockout ? '(품절)' : ''}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-amber-600 text-[11px] pt-1 border-t border-slate-100">
                            <span>안전재고 기준선:</span>
                            <span className="font-mono">{data.safetyStock}개</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
              />

              {/* Safety stock reference line */}
              <ReferenceLine
                y={calculations.safetyStock}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: `안전재고선 (${calculations.safetyStock}개)`,
                  fill: '#d97706',
                  fontSize: 10,
                  position: 'right',
                }}
              />

              {/* Stockout expected timing line */}
              {calculations.stockoutDayInt <= 30 && chartData[calculations.stockoutDayInt] && (
                <ReferenceLine
                  x={chartData[calculations.stockoutDayInt].label}
                  stroke="#f43f5e"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  label={{
                    value: `품절 예상 (D+${calculations.exactStockoutDays})`,
                    fill: '#e11d48',
                    fontSize: 10,
                    position: 'top',
                  }}
                />
              )}

              {/* Arrival timing line */}
              {calculations.arrivalDay <= 30 && chartData[calculations.arrivalDay] && (
                <ReferenceLine
                  x={chartData[calculations.arrivalDay].label}
                  stroke="#4f46e5"
                  strokeWidth={1.5}
                  label={{
                    value: `입고 (+${calculations.Q}개)`,
                    fill: '#4338ca',
                    fontSize: 10,
                    position: 'top',
                  }}
                />
              )}

              {/* Area for Replenix Reorder Stock */}
              <Area
                type="monotone"
                dataKey="reorderStock"
                name="Replenix 발주 시 예상 재고"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#reorderStockGrad)"
              />

              {/* Line for No Reorder Stockout curve */}
              <Line
                type="monotone"
                dataKey="noOrderStock"
                name="발주 미진행 시 재고 고갈 (0개 도달)"
                stroke="#f43f5e"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Legend / Guide Footer */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <span>파란 곡선: 적정 발주가 입고되어 안전재고 이상으로 회복되는 궤적</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>빨간 점선: 발주를 안 했을 때 재고가 바닥나 품절되는 시점</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>노란 기준선: 최소 3일치 판매량을 확보하는 안전재고선</span>
          </div>
        </div>

        {/* Quick SKU pill switcher for other urgent SKUs */}
        <div className="flex items-center gap-1 text-[11px]">
          <span className="text-slate-400">품절 임박 품목:</span>
          {items
            .filter((i) => i.urgency === 'critical' || i.urgency === 'warning')
            .slice(0, 3)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemChange(item.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                  activeItemId === item.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.code} ({item.stockoutRiskDays}일 남음)
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
