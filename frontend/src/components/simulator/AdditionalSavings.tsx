import { SAVINGS_ITEMS } from '@/shared/constants/savingitems';
import SimulatorCard from '../ui/SimulatorCard';

import Piggybank from '@/assets/icons/piggybank.svg';
import { useState } from 'react';
import Input from '../ui/Input';

export default function AdditionalSavings() {
  const [expenses, setExpenses] = useState(() => {
    const initialState: Record<string, number> = {};
    SAVINGS_ITEMS.forEach((item) => {
      initialState[item.id] = 0;
    });
    return initialState;
  });

  const handleExpenseChange = (id: string, value: number) => {
    setExpenses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <SimulatorCard
      number={3}
      title="Mon épargne complémentaire"
      description={
        <span>
          <strong className="text-[#EF8E61]">Augmentez</strong>{' '}
          <img src={Piggybank} className="w-4 h-4 inline-block" /> votre épargne
          via le plan complémentaire
        </span>
      }
      bgColor="#EF8E611A"
      badgeColor="#EF8E61"
    >
      <div className="space-y-4">
        {SAVINGS_ITEMS.map((item) => (
          <div
            key={item.id}
            className="border-b pb-4 last:border-0 last:pb-0"
            style={{ borderColor: 'rgba(239, 142, 97, 0.2)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.icon}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                />
                <h4 className="text-sm text-gray-900">{item.name}</h4>
              </div>
              <div className="text-right">
                <Input
                  value={expenses[item.id]}
                  onChange={(val) => handleExpenseChange(item.id, val)}
                  borderClass="border-[#EF8E61]"
                  textClass="text-[#EF8E61]"
                  isMonthly={item.id === 'monthly'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SimulatorCard>
  );
}
