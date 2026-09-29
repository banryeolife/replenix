export interface SKUItem {
  id: string;
  code: string;
  name: string;
  category: string;
  unitCost: number; // 공급원가 (원)
  sellingPrice: number; // 판매가 (원)
  currentStock: number; // 현재 창고 재고 (개)
  leadTimeDays: number; // 발주 리드타임 (일)
  dailyVelocity: number; // 일평균 판매량 (개/일)
  stockoutRiskDays: number; // 품절 도달 예정일
  moq: number; // 최소 주문수량 (MOQ)
  recommendedQty: number; // Replenix 제안 발주 수량
  allocatedQty: number; // 예산 제약 하 실제 할당 수량
  totalAmount: number; // 발주 필요 금액
  urgency: 'critical' | 'warning' | 'safe' | 'overstock';
  marginRate: number; // 마진율 (%)
  roiScore: number; // 투자대비 회수 점수 (알고리즘 가중치)
  reason: string; // 의사결정 근거
}

export type StrategyMode = 'cash_defense' | 'balanced' | 'sales_max' | 'high_margin';

export interface TenantPreset {
  id: string;
  name: string;
  description: string;
  skuCount: number;
  monthlyRevenue: string;
  defaultBudget: number;
  items: SKUItem[];
}

export interface SimulationResult {
  totalBudget: number;
  spentBudget: number;
  remainingCash: number;
  preventedLostSales: number; // 방어된 기회매출
  capitalTiedUpSaved: number; // 절감된 묶인 자본
  storageFeeSaved: number; // 창고 보관료 절감액
  criticalItemsCount: number;
  orderedItemsCount: number;
}

export interface InvestorMetrics {
  tam: string;
  sam: string;
  som: string;
  targetMrrYear1: string;
  targetMrrYear3: string;
  pilotStockoutReduction: string;
  pilotCashRecovery: string;
  ltvCacRatio: string;
}
