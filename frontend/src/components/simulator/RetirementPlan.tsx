import { useState } from 'react';
import { TabGroup } from '../ui/TabGroup';
import Input from '../ui/Input';
import Card from '../ui/Card';

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
      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
        {label}
      </p>
    </div>
  );
}

export default function RetirementPlan() {
  const [need, setNeed] = useState('PRÉPARER MA RETRAITE');
  const [years, setYears] = useState(21);
  const [approach, setApproach] = useState('PRUDENCE');

  return (
    <div className="flex flex-col w-full max-w-2xl gap-8 mt-2">
      {/* Section 1: Votre Besoin */}
      <div className="flex flex-col items-center gap-4 px-10">
        <h2 className="text-md text-black">Votre besoin</h2>
        <TabGroup
          options={['PRÉPARER MA RETRAITE', 'METTRE DE CÔTÉ']}
          activeValue={need}
          onChange={setNeed}
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
          options={['PRUDENCE', 'ÉQUILIBRE', 'DYNAMISME', 'AUDACE']}
          activeValue={approach}
          onChange={setApproach}
          activeClass="bg-[#E6F1F1]"
        />
      </div>
      <Card className="p-4 flex flex-col gap-4 shadow-sm border-gray-100 rounded-2xl bg-white">
        {/* Title Section */}
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

        <div className="flex items-center justify-between gap-1">
          {/* Left Box: Investissements */}
          <div className="flex-1 border rounded-xl border-gray-100 p-2 min-w-0">
            <p className="text-[10px] text-gray-500 font-medium mb-2">
              Vos investissements
            </p>
            <div className="flex justify-between items-center gap-1">
              <InvestmentItem
                value="21 680"
                label="CAGNOTTÉ"
                color="text-[#006D77]"
              />
              <div className="h-6 border-r border-dashed border-gray-300 mx-0.5" />
              <InvestmentItem
                value="14 270"
                label="ÉCONOMISÉ"
                color="text-[#9B51E0]"
              />
              <div className="h-6 border-r border-dashed border-gray-300 mx-0.5" />
              <InvestmentItem
                value="54 320"
                label="CONTRIBUÉ"
                color="text-[#F2994A]"
              />
            </div>
          </div>

          <span className="rounded-full w-5 h-5 flex items-center justify-center bg-white border text-gray-300 font-light text-sm">
            +
          </span>

          {/* Middle Box: Gains */}
          <div className="border rounded-xl border-gray-100 p-2 flex flex-col justify-center items-center min-w-[65px]">
            <p className="text-[10px] text-gray-500 font-medium mb-1 text-center leading-tight">
              Vos gains réalisés
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#B2D8D8]" />
              <p className="text-[12px] font-bold text-black">53 000 €</p>
            </div>
          </div>

          {/* Equals Sign */}
          <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#006D77] text-white text-[10px] font-bold">
            =
          </span>

          {/* Right Box: Total */}
          <div className="border rounded-xl border-gray-100 p-2 flex flex-col justify-center items-center min-w-[75px]">
            <p className="text-[10px] text-gray-500 font-medium mb-1 text-center leading-tight">
              Votre retraite
            </p>
            <p className="text-[12px] font-bold text-[#006D77]">143 270 €</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
