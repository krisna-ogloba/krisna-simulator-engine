import { DAILY_EXPENSES } from '@/shared/constants/cashback';
import SimulatorCard from '../ui/SimulatorCard';
import Input from '../ui/Input';
import { useState } from 'react';
import Coins from '@/assets/icons/coins.svg';

export default function DailyExpense() {
  const [expenses, setExpenses] = useState(() => {
    const initialState: Record<string, number> = {};
    DAILY_EXPENSES.forEach((cat) => {
      initialState[cat.id] = 0;
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
      number={1}
      title="Mes dépenses courantes"
      description={
        <span>
          Générez du <strong className="text-[#006F73]">Cashback</strong>{' '}
          <img src={Coins} className="w-4 h-4 inline-block" /> sur vos dépenses
          du quotidien
        </span>
      }
      bgColor="#006F731A"
      badgeColor="#006F73"
    >
      <div className="space-y-4">
        {DAILY_EXPENSES.map((category) => (
          <div
            key={category.id}
            className="border-b border-dashed border-[#8B8A93] pb-2 last:border-0 last:pb-0"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-lg shrink-0">
                  <img src={category.icon} alt={category.name} />
                </div>
                <div>
                  <h4 className="text-sm">{category.name}</h4>
                  {/* Partners Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.partners.map((partner) => (
                      <div className="flex items-center gap-1 rounded-[10px] p-1 text-[10px] bg-white">
                        <img
                          src={partner.icon}
                          alt={partner.name}
                          className="w-6 h-6"
                        />
                        <div className="flex flex-col">
                          <p className="font-bold">{partner.name}</p>
                          <div className="bg-[#E6F1F1] w-fit p-0.5 rounded-lg font-bold text-[#006F73]">
                            <p>{partner.percentage}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right ">
                <Input
                  borderClass="border-[#006F73]"
                  textClass="text-[#006F73]"
                  value={expenses[category.id]}
                  onChange={(value) => handleExpenseChange(category.id, value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SimulatorCard>
  );
}
