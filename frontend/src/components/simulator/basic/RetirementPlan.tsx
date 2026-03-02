import { useEffect, useMemo, useState } from 'react';
import { TabGroup } from '../../ui/TabGroup';
import Input from '../../ui/Input';
import Card from '../../ui/Card';
import StackedBarChart, { type RetirementChartPoint } from '../../ui/Chart';
import { calculateSimulation } from '@/APIs';
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
  annualCagnotte: number;
  annualEconomise: number;
  annualContribue: number;
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
  annualCagnotte,
  annualEconomise,
  annualContribue,
}: RetirementPlanProps) {
  const [selectedNeed, setSelectedNeed] = useState(NEEDS[0]);
  const [years, setYears] = useState(21);
  const [selectedRisk, setSelectedRisk] = useState(RISK_LEVELS[0]);
  const [earnings, setEarnings] = useState(0);
  const [selectedBarIndex, setSelectedBarIndex] = useState(0);

  const totalInvested = annualCagnotte + annualEconomise + annualContribue;
  const debouncedTotalInvested = useDebounce(totalInvested, 1000);
  const debouncedYears = useDebounce(years, 500);

  useEffect(() => {
    if (debouncedTotalInvested <= 0 || debouncedYears <= 0) {
      setEarnings(0);
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
        });

        const earningsValue = Math.max(
          0,
          result.central - debouncedTotalInvested,
        );
        setEarnings(earningsValue);
      } catch (error) {
        // Handle abort signal errors gracefully
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        // Fallback calculation if API fails
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

  const chartData = useMemo<RetirementChartPoint[]>(() => {
    const points: RetirementChartPoint[] = [];
    const currentYear = new Date().getFullYear();

    let step;
    if (debouncedYears >= 20) {
      step = 3;
    } else {
      step = 2;
    }

    for (let yearOffset = 0; yearOffset <= debouncedYears; yearOffset += step) {
      const displayYear = currentYear + yearOffset;
      const investedYears = yearOffset;
      const gainProgress = Math.min(
        investedYears / Math.max(1, debouncedYears),
        1,
      );

      points.push({
        name: `'${displayYear.toString().slice(-2)}`,
        cagnotte: annualCagnotte * investedYears,
        economie: annualEconomise * investedYears,
        contribution: annualContribue * investedYears,
        gains: earnings * gainProgress,
      });
    }

    return points;
  }, [
    annualCagnotte,
    annualContribue,
    annualEconomise,
    earnings,
    debouncedYears,
  ]);

  const safeSelectedIndex = Math.min(
    selectedBarIndex,
    Math.max(chartData.length - 1, 0),
  );
  const selectedPoint =
    chartData[safeSelectedIndex] ??
    ({
      name: '',
      cagnotte: 0,
      economie: 0,
      contribution: 0,
      gains: 0,
    } as const);
  const retirementTotal = totalInvested + earnings;

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
          onChange={setYears}
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
      <Card className=" flex flex-col gap-4 shadow-sm border-gray-100 w-full rounded-2xl bg-white">
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-1 w-full">
          {/* Investissements */}
          <div className="flex-1 border rounded-xl border-gray-100 p-2 w-full">
            <p className="text-[12px] text-gray-500 font-medium mb-2">
              Vos investissements
            </p>

            <div className="flex sm:flex-row sm:items-center justify-between w-full">
              <InvestmentItem
                value={formatEuro(annualCagnotte)}
                label="CAGNOTTÉ"
                color="text-[#006D77]"
              />

              <div className="block h-6 border-r border-dashed border-gray-300" />

              <InvestmentItem
                value={formatEuro(annualEconomise)}
                label="ÉCONOMISÉ"
                color="text-[#9B51E0]"
              />

              <div className="block h-6 border-r border-dashed border-gray-300" />

              <InvestmentItem
                value={formatEuro(annualContribue)}
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
                {formatEuro(earnings)} €
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
            Mon Epargne Annuelle ({selectedPoint.name})
          </p>

          <div className="flex sm:flex-row sm:items-center justify-center gap-2">
            <InvestmentItem
              value={formatEuro(selectedPoint.cagnotte)}
              label="CAGNOTTÉ"
              color="text-[#006D77]"
            />

            <div className="block h-6 border-r border-dashed border-gray-300" />

            <InvestmentItem
              value={formatEuro(selectedPoint.economie)}
              label="ÉCONOMISÉ"
              color="text-[#9B51E0]"
            />

            <div className="block h-6 border-r border-dashed border-gray-300" />

            <InvestmentItem
              value={formatEuro(selectedPoint.contribution)}
              label="CONTRIBUÉ"
              color="text-[#F2994A]"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
