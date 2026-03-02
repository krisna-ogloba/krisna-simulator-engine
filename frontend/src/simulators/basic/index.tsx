import { useMemo, useState } from 'react';
import DailyExpense from '@/components/simulator/basic/DailyExpense';
import FixedCharges from '@/components/simulator/basic/FixedCharges';
import AdditionalSavings from '@/components/simulator/basic/AdditionalSavings';
import RetirementPlan from '@/components/simulator/basic/RetirementPlan';
import { DAILY_EXPENSES } from '@/shared/constants/basic/cashback';
import { FIXED_CHARGES } from '@/shared/constants/basic/fixedcharge';
import { SAVINGS_ITEMS } from '@/shared/constants/basic/savingitems';

const buildInitialValues = (ids: string[]) =>
  ids.reduce((acc, id) => ({ ...acc, [id]: 0 }), {} as Record<string, number>);

export default function BasicSimulation() {
  const [dailyExpenseValues, setDailyExpenseValues] = useState<
    Record<string, number>
  >(() => buildInitialValues(DAILY_EXPENSES.map((item) => item.id)));

  const [fixedChargeValues, setFixedChargeValues] = useState<
    Record<string, number>
  >(() => buildInitialValues(FIXED_CHARGES.map((item) => item.id)));

  const [savingValues, setSavingValues] = useState<Record<string, number>>(() =>
    buildInitialValues(SAVINGS_ITEMS.map((item) => item.id)),
  );

  const dailyAnnual = useMemo(
    () =>
      Object.values(dailyExpenseValues).reduce((sum, val) => sum + val, 0) * 12,
    [dailyExpenseValues],
  );

  const fixedAnnual = useMemo(
    () =>
      Object.values(fixedChargeValues).reduce((sum, val) => sum + val, 0) * 12,
    [fixedChargeValues],
  );

  const savingsAnnual = useMemo(() => {
    const initial = Number(savingValues.initial ?? 0);
    const monthly = Number(savingValues.monthly ?? 0) * 12;
    return initial + monthly;
  }, [savingValues]);

  const handleDailyExpenseChange = (id: string, value: number) => {
    setDailyExpenseValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFixedChargeChange = (id: string, value: number) => {
    setFixedChargeValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSavingChange = (id: string, value: number) => {
    setSavingValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen py-8 max-w-xl px-4 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Simulateur Cagn'up</h1>
        <p className="text-center text-gray-600">
          Découvrez combien vous pourriez épargner (presque) sans effort
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        <DailyExpense
          expenses={dailyExpenseValues}
          onChange={handleDailyExpenseChange}
        />
        <FixedCharges
          expenses={fixedChargeValues}
          onChange={handleFixedChargeChange}
        />
        <AdditionalSavings
          expenses={savingValues}
          onChange={handleSavingChange}
        />
        <RetirementPlan
          annualCagnotte={dailyAnnual}
          annualEconomise={fixedAnnual}
          annualContribue={savingsAnnual}
        />
      </div>
    </div>
  );
}
