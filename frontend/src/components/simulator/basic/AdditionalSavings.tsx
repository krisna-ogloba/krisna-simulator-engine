import { SAVINGS_ITEMS } from '@/shared/constants/basic/savingitems';
import SimulatorCard from '../../ui/SimulatorCard';

import Piggybank from '@/assets/icons/piggybank.svg';
import Input from '../../ui/Input';

type AdditionalSavingsProps = {
  expenses: Record<string, number>;
  onChange: (id: string, value: number) => void;
};

export default function AdditionalSavings({
  expenses,
  onChange,
}: AdditionalSavingsProps) {
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
                  onChange={(val) => onChange(item.id, val)}
                  borderClass="border-[#EF8E61]"
                  textClass="text-[#EF8E61]"
                  unit={'€'}
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
