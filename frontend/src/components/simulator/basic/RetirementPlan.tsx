import { useEffect, useState } from 'react';
import { TabGroup } from '../../ui/TabGroup';
import Input from '../../ui/Input';
import StackedBarChart from '../../ui/Chart';
import { calculateSimulation, type ChartDataPoint } from '@/APIs';
import { useDebounce } from '@/shared/hooks';

function InvestmentItem({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className={`text-[12px] font-bold ${color}`}>{value} €</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        {label}
      </p>
    </div>
  );
}

type RetirementPlanProps = {
  annualCashback: number;
  annualSaved: number;
  annualContributed: number;
};

function formatEuro(value: number) {
  return Math.round(value).toLocaleString('fr-FR');
}

const NEEDS = [
  { name: 'PRÉPARER MA RETRAITE', type: 'life_insurance' as const },
  { name: 'METTRE DE CÔTÉ', type: 'savings' as const },
];

const RISK_LEVELS = [
  { name: 'PRUDENCE', level: 1 as const },
  { name: 'ÉQUILIBRE', level: 2 as const },
  { name: 'DYNAMISME', level: 3 as const },
  { name: 'AUDACE', level: 4 as const },
];

export default function RetirementPlan({
  annualCashback,
  annualSaved,
  annualContributed,
}: RetirementPlanProps) {
  const [selectedNeed, setSelectedNeed] = useState(NEEDS[0]);
  const [years, setYears] = useState(21);
  const [selectedRisk, setSelectedRisk] = useState(RISK_LEVELS[0]);
  const [, setEarnings] = useState(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const totalInvested = annualCashback + annualSaved + annualContributed;
  const debouncedTotalInvested = useDebounce(totalInvested, 1000);
  const debouncedYears = useDebounce(years, 500);
  const debouncedAnnualCashback = useDebounce(annualCashback, 1000);
  const debouncedAnnualSaved = useDebounce(annualSaved, 1000);
  const debouncedAnnualContributed = useDebounce(annualContributed, 1000);

  useEffect(() => {
    if (debouncedTotalInvested <= 0 || debouncedYears <= 0) {
      setEarnings(0);
      setChartData([]);
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        const result = await calculateSimulation({
          initialAmount: debouncedTotalInvested,
          duration: debouncedYears,
          productType: selectedNeed.type,
          riskLevel: selectedRisk.level,
          annualCashback: debouncedAnnualCashback,
          annualSaved: debouncedAnnualSaved,
          annualContributed: debouncedAnnualContributed,
        });

        setEarnings(result.earnings);
        setChartData(result.chartData);
      } catch (error) {
        // Handle abort signal errors gracefully
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        const fallbackRateByRisk: Record<number, number> = {
          1: 0.02,
          2: 0.03,
          3: 0.04,
          4: 0.05,
        };
        const rate = fallbackRateByRisk[selectedRisk.level] ?? 0.03;
        const fallbackEarnings =
          debouncedTotalInvested *
          (Math.pow(1 + rate, Math.max(1, debouncedYears)) - 1);
        setEarnings(Math.max(0, fallbackEarnings));
        setChartData([]);
      }
    };

    run();
    return () => controller.abort();
  }, [
    selectedNeed.type,
    selectedRisk.level,
    debouncedTotalInvested,
    debouncedYears,
  ]);

  useEffect(() => {
    if (chartData.length === 0) {
      setSelectedBarIndex(0);
      return;
    }

    let maxIndex = 0;
    let maxTotal = -Infinity;

    chartData.forEach((point, index) => {
      const total =
        (point.cashback ?? 0) +
        (point.saved ?? 0) +
        (point.contributed ?? 0) +
        (point.earnings ?? 0);

      if (total > maxTotal) {
        maxTotal = total;
        maxIndex = index;
      }
    });

    setSelectedBarIndex(maxIndex);
  }, [chartData]);

  const safeSelectedIndex = Math.min(
    selectedBarIndex,
    Math.max(chartData.length - 1, 0),
  );
  const yearOptions = chartData.map((point, index) => ({
    label: point.year || `Année ${index + 1}`,
    value: index,
  }));
  const selectedPoint =
    chartData[safeSelectedIndex] ??
    ({
      year: '',
      cashback: 0,
      saved: 0,
      contributed: 0,
      earnings: 0,
    } as const);

  const selectedTotalInvested =
    selectedPoint.cashback + selectedPoint.saved + selectedPoint.contributed;
  const retirementTotal = selectedTotalInvested + selectedPoint.earnings;

  return (
    <div className="flex flex-col w-full max-w-2xl gap-8 mt-2">
      {/* Section 1: Votre Besoin */}
      <div className="flex flex-col items-center gap-4 px-10">
        <h2 className="text-md text-black">Votre besoin</h2>
        <TabGroup
          options={NEEDS.map((n) => n.name)}
          activeValue={selectedNeed.name}
          onChange={(name) => {
            const need = NEEDS.find((n) => n.name === name);
            if (need) setSelectedNeed(need);
          }}
          activeClass="bg-[#FEF4F0]"
        />
      </div>

      {/* Section 2: Timeline Input */}
      <div className="flex items-center gap-4 mx-auto px-2">
        <p className="text-[12px] text-black">
          Dans combien d’années partez-vous à la retraite ?
        </p>
        <Input
          value={years}
          onChange={(value) => setYears(Math.min(value, 50))}
          unit="ans"
          isMonthly={false}
          borderClass="border-[#F4A261]"
        />
      </div>

      {/* Section 3: Mon Approche */}
      <div className="flex flex-col items-center gap-4 px-2">
        <h2 className="text-md text-black">Mon approche de l'épargne</h2>
        <TabGroup
          options={RISK_LEVELS.map((risk) => risk.name)}
          activeValue={selectedRisk.name}
          onChange={(name) => {
            const risk = RISK_LEVELS.find((r) => r.name === name);
            if (risk) setSelectedRisk(risk);
          }}
          activeClass="bg-[#E6F1F1]"
        />
      </div>
      <div className="flex flex-col gap-4 w-full px-2 py-3 sm:mx-0 sm:px-4 sm:py-4 sm:shadow-sm sm:border sm:border-gray-100 sm:rounded-2xl sm:bg-white">
        {/* Title */}
        <div className="flex items-center gap-1.5">
          <h2 className="text-[16px] text-black">Mon Plan Épargne Retraite</h2>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
          <p className="text-[12px] text-gray-500">Choisir une année</p>
          <select
            className="h-8 rounded-lg border border-gray-200 px-2 text-[12px] text-gray-700"
            value={safeSelectedIndex}
            onChange={(event) =>
              setSelectedBarIndex(Number(event.target.value))
            }
            disabled={yearOptions.length === 0}
          >
            {yearOptions.length === 0 ? (
              <option value={0}>Aucune année</option>
            ) : (
              yearOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-1 w-full">
          {/* Investissements */}
          <div className="flex-1 border rounded-xl border-gray-100 p-2 w-full">
            <p className="text-[12px] text-gray-500 font-medium mb-2">
              Vos investissements ({selectedPoint.year})
            </p>

            <div className="flex sm:flex-row sm:items-center justify-between w-full">
              <InvestmentItem
                value={formatEuro(selectedPoint.cashback)}
                label="CAGNOTTÉ"
                color="text-[#006D77]"
              />

              <div className="block h-6 border-r border-dashed border-gray-300" />

              <InvestmentItem
                value={formatEuro(selectedPoint.saved)}
                label="ÉCONOMISÉ"
                color="text-[#9B51E0]"
              />

              <div className="block h-6 border-r border-dashed border-gray-300" />

              <InvestmentItem
                value={formatEuro(selectedPoint.contributed)}
                label="CONTRIBUÉ"
                color="text-[#F2994A]"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <span className="rounded-full w-6 h-6 flex items-center justify-center bg-white border text-gray-300 text-sm">
              +
            </span>
          </div>

          <div className="border rounded-xl border-gray-100 p-3 flex flex-col justify-center items-center">
            <p className="text-[12px] text-gray-500 font-medium mb-1 text-center">
              Vos gains réalisés
            </p>

            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#B2D8D8]" />
              <p className="text-[12px] font-bold text-black">
                {formatEuro(selectedPoint.earnings)} €
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#006D77] text-white text-[10px] font-bold">
              =
            </span>
          </div>

          {/* Total */}
          <div className="border rounded-xl border-gray-100 p-3 flex flex-col justify-center items-center">
            <p className="text-[12px] text-gray-500 font-medium mb-1 text-center">
              Votre retraite
            </p>

            <p className="text-[12px] font-bold text-[#006D77]">
              {formatEuro(retirementTotal)} €
            </p>
          </div>
        </div>

        <StackedBarChart
          dataPoints={chartData}
          selectedIndex={safeSelectedIndex}
          onBarClick={setSelectedBarIndex}
        />

        <div className="w-fit border rounded-xl border-gray-100 p-2 mx-auto">
          <p className="text-[12px] font-medium mb-2 text-center">
            Mon Epargne Annuelle
          </p>

          <div className="flex sm:flex-row sm:items-center justify-center gap-2">
            <InvestmentItem
              value={formatEuro(annualCashback)}
              label="CAGNOTTÉ"
              color="text-[#006D77]"
            />

            <div className="block h-6 border-r border-dashed border-gray-300" />

            <InvestmentItem
              value={formatEuro(annualSaved)}
              label="ÉCONOMISÉ"
              color="text-[#9B51E0]"
            />

            <div className="block h-6 border-r border-dashed border-gray-300" />

            <InvestmentItem
              value={formatEuro(annualContributed)}
              label="CONTRIBUÉ"
              color="text-[#F2994A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
