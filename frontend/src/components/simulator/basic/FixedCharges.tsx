import React from 'react';
import SimulatorCard from '../../ui/SimulatorCard';
import { FIXED_CHARGES } from '@/shared/constants/basic/fixedcharge';
import Input from '../../ui/Input';

import HandCoin from '@/assets/icons/handcoin.svg';
import Coins from '@/assets/icons/coins.svg';

type FixedChargesProps = {
  expenses: Record<string, number>;
  onChange: (id: string, value: number) => void;
};

export default function FixedCharges({
  expenses,
  onChange,
}: FixedChargesProps) {
  const [charges] = React.useState(FIXED_CHARGES);

  return (
    <SimulatorCard
      number={2}
      title="Mes charges fixes"
      description={
        <span>
          <strong className="text-[#B560C0]">Économisez</strong>{' '}
          <img src={HandCoin} className="w-4 h-4 inline-block" /> sur vos
          factures et générez du{' '}
          <strong className="text-[#006F73]">Cashback</strong>{' '}
          <img src={Coins} className="w-4 h-4 inline-block" /> chaque mois
        </span>
      }
      bgColor="#B560C01A"
      badgeColor="#B560C0"
    >
      <div className="space-y-4 mb-4">
        {charges.map((charge) => (
          <div
            key={charge.id}
            className="border-b border-[#8B8A93] border-dashed pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={charge.icon}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lgshrink-0"
                />
                <h4 className="text-sm">{charge.name}</h4>
              </div>
              <div className="text-right">
                <Input
                  borderClass="border-[#B560C0]"
                  textClass="text-[#B560C0]"
                  unit="€"
                  value={expenses[charge.id]}
                  onChange={(value: number) => onChange(charge.id, value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Charge Button */}
      <div className="flex w-full items-center justify-center">
        <button
          onClick={() => {}}
          className=" p-2 rounded-lg text-sm font-medium text-gray-700 hover:opacity-80 transition flex items-center justify-center gap-2 bg-white border"
        >
          <span>Ajouter une charge</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="#B560C0"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8m-4-4h8" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </SimulatorCard>
  );
}
