import { SKUItem, StrategyMode, SimulationResult } from '../types';

export function runOptimization(
  items: SKUItem[],
  budget: number,
  strategy: StrategyMode
): { updatedItems: SKUItem[]; results: SimulationResult } {
  // Strategy factors
  let bufferDaysMultiplier = 1.0;
  let marginWeight = 1.0;

  switch (strategy) {
    case 'cash_defense':
      bufferDaysMultiplier = 0.65; // 타이트하게 최소한만 발주
      marginWeight = 0.8;
      break;
    case 'sales_max':
      bufferDaysMultiplier = 1.35; // 품절 제로, 성수기 버퍼 확대
      marginWeight = 1.2;
      break;
    case 'high_margin':
      bufferDaysMultiplier = 1.0;
      marginWeight = 1.8; // 마진율 높은 상품에 우선순위 대폭 부여
      break;
    case 'balanced':
    default:
      bufferDaysMultiplier = 1.0;
      marginWeight = 1.0;
      break;
  }

  // Calculate base needs for each item
  const evaluated = items.map((item) => {
    const daysUntilStockout = item.dailyVelocity > 0 ? item.currentStock / item.dailyVelocity : 999;
    const targetCycleDays = 14 * bufferDaysMultiplier; // 2주 주기 기준
    const neededStock = Math.ceil((item.leadTimeDays + targetCycleDays) * item.dailyVelocity);
    const rawDeficit = Math.max(0, neededStock - item.currentStock);

    // Apply MOQ
    let recommended = 0;
    if (rawDeficit > 0) {
      recommended = Math.max(item.moq, Math.ceil(rawDeficit / (item.moq || 1)) * item.moq);
    }

    // Determine urgency
    let urgency: SKUItem['urgency'] = 'safe';
    if (daysUntilStockout <= item.leadTimeDays) {
      urgency = 'critical';
    } else if (daysUntilStockout <= item.leadTimeDays + 5) {
      urgency = 'warning';
    } else if (daysUntilStockout > 60) {
      urgency = 'overstock';
      recommended = 0; // 과잉재고는 무조건 0개
    }

    // ROI Score calculation (Knapsack value density)
    const margin = item.sellingPrice - item.unitCost;
    const marginScore = (margin / item.sellingPrice) * 100 * marginWeight;
    const urgencyScore = urgency === 'critical' ? 120 : urgency === 'warning' ? 80 : urgency === 'safe' ? 40 : 5;
    const roiScore = Math.min(99, Math.round((marginScore * 0.4) + (urgencyScore * 0.6)));

    const neededAmount = recommended * item.unitCost;

    return {
      ...item,
      stockoutRiskDays: Number(daysUntilStockout.toFixed(1)),
      recommendedQty: recommended,
      allocatedQty: 0,
      totalAmount: neededAmount,
      urgency,
      roiScore,
    };
  });

  // Sort by priority for Knapsack allocation (critical first, then by roiScore desc)
  const sorted = [...evaluated].sort((a, b) => {
    if (a.urgency === 'critical' && b.urgency !== 'critical') return -1;
    if (b.urgency === 'critical' && a.urgency !== 'critical') return 1;
    return b.roiScore - a.roiScore;
  });

  let remainingBudget = budget;
  let spentBudget = 0;
  let preventedLostSales = 0;
  let capitalTiedUpSaved = 0;
  let storageFeeSaved = 0;
  let orderedItemsCount = 0;
  let criticalItemsCount = 0;

  const finalItems = sorted.map((item) => {
    if (item.urgency === 'critical') {
      criticalItemsCount += 1;
    }

    if (item.urgency === 'overstock') {
      // 과잉재고에 대해 발주를 막음으로써 방어한 현금 (원래 살 뻔했던 1회 MOQ 상당 금액)
      capitalTiedUpSaved += item.moq * item.unitCost;
      storageFeeSaved += 85000; // CBM 보관료 절감
      return {
        ...item,
        allocatedQty: 0,
        totalAmount: 0,
        reason: `${item.stockoutRiskDays}일치 재고 과다. 현금 묶임 방지 위해 발주 동결 (0개)`,
      };
    }

    if (item.recommendedQty === 0) {
      return {
        ...item,
        allocatedQty: 0,
        totalAmount: 0,
        reason: '현재 충분한 안전재고 보유 중. 차주 발주 주기로 이월',
      };
    }

    const itemCost = item.recommendedQty * item.unitCost;

    if (remainingBudget >= itemCost) {
      // Full allocation
      remainingBudget -= itemCost;
      spentBudget += itemCost;
      orderedItemsCount += 1;

      // Prevented lost sales = potential daily lost revenue during lead time stockout
      const lostDays = Math.max(0, item.leadTimeDays - item.stockoutRiskDays + 5);
      preventedLostSales += Math.round(lostDays * item.dailyVelocity * item.sellingPrice);

      return {
        ...item,
        allocatedQty: item.recommendedQty,
        totalAmount: itemCost,
        reason: item.urgency === 'critical' 
          ? `[긴급 발주] ${item.stockoutRiskDays}일 내 결품 위험. 예산 최우선 전액 배정 완료`
          : `[정상 발주] 회전율 및 마진 기준 예산 충족`,
      };
    } else if (remainingBudget >= item.moq * item.unitCost) {
      // Partial allocation (down to MOQ units)
      const affordableUnits = Math.floor(remainingBudget / (item.moq * item.unitCost)) * item.moq;
      if (affordableUnits > 0) {
        const cost = affordableUnits * item.unitCost;
        remainingBudget -= cost;
        spentBudget += cost;
        orderedItemsCount += 1;

        const lostDays = Math.max(0, item.leadTimeDays - item.stockoutRiskDays + 2);
        preventedLostSales += Math.round(lostDays * item.dailyVelocity * item.sellingPrice);

        return {
          ...item,
          allocatedQty: affordableUnits,
          totalAmount: cost,
          reason: `[예산 한도 부분 배분] 필요 수량(${item.recommendedQty}개) 중 잔여 예산 내 ${affordableUnits}개 배정`,
        };
      }
    }

    // Budget exceeded
    return {
      ...item,
      allocatedQty: 0,
      totalAmount: 0,
      reason: `[예산 제약 탈락] 상위 고마진/긴급 품목에 예산 우선 배분되어 금주 발주 유보`,
    };
  });

  // Re-sort back to original list order or critical first
  const displayItems = finalItems.sort((a, b) => {
    const urgencyOrder = { critical: 0, warning: 1, safe: 2, overstock: 3 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  const results: SimulationResult = {
    totalBudget: budget,
    spentBudget,
    remainingCash: remainingBudget,
    preventedLostSales,
    capitalTiedUpSaved,
    storageFeeSaved,
    criticalItemsCount,
    orderedItemsCount,
  };

  return { updatedItems: displayItems, results };
}
