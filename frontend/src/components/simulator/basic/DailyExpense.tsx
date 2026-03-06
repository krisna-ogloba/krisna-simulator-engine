import { DAILY_EXPENSES } from '@/shared/constants/basic/cashback';
import { useIsMobile } from '@/shared/hooks';
import SimulatorCard from '../../ui/SimulatorCard';
import Input from '../../ui/Input';
import Coins from '@/assets/icons/coins.svg';

type DailyExpenseProps = {
  expenses: Record<string, number>;
  onChange: (id: string, value: number) => void;
};

export default function DailyExpense({
  expenses,
  onChange,
}: DailyExpenseProps) {
  const isMobile = useIsMobile(568);

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
            <div
              className={`flex ${isMobile ? 'items-start' : 'items-center'} justify-between mb-2`}
            >
              {isMobile ? (
                <div className="flex flex-col items-start gap-3 flex-1">
                  <div className="w-14 h-14 rounded-lg flex gap-2 items-center text-lg shrink-0">
                    <img src={category.icon} alt={category.name} />
                    <h4 className="text-sm">{category.name}</h4>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    {category.partners.map((partner, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 rounded-[10px] p-1 text-[10px] bg-white"
                      >
                        <img
                          src={partner.icon}
                          alt={partner.name}
                          className="w-7.5 h-7.5"
                        />
                        <div className="flex flex-col gap-0.75">
                          <p className="font-semibold text-[10px]">
                            {partner.name}
                          </p>
                          <div className="bg-[#E6F1F1] text-[10px] w-fit p-0.5 rounded-lg font-bold text-[#006F73]">
                            <p>{partner.percentage}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start items-center gap-3 flex-1">
                  <div className="w-14 h-14 rounded-lg flex gap-2 items-center text-lg shrink-0">
                    <img src={category.icon} alt={category.name} />
                  </div>
                  <div>
                    <h4 className="text-sm">{category.name}</h4>
                    <div className="flex items-center flex-wrap gap-2">
                      {category.partners.map((partner, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 rounded-[10px] p-1 text-[10px] bg-white"
                        >
                          <img
                            src={partner.icon}
                            alt={partner.name}
                            className="w-7.5 h-7.5"
                          />
                          <div className="flex flex-col gap-0.75">
                            <p className="font-semibold text-[10px]">
                              {partner.name}
                            </p>
                            <div className="bg-[#E6F1F1] text-[10px] w-fit p-0.5 rounded-lg font-bold text-[#006F73]">
                              <p>{partner.percentage}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-right ">
                <Input
                  borderClass="border-[#006F73]"
                  textClass="text-[#006F73]"
                  value={expenses[category.id]}
                  onChange={(value) => onChange(category.id, value)}
                  unit={'€'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SimulatorCard>
  );
}
