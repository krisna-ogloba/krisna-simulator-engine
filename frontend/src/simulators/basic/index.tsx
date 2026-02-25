import DailyExpense from '../../components/simulator/DailyExpense';
import FixedCharges from '../../components/simulator/FixedCharges';
import AdditionalSavings from '../../components/simulator/AdditionalSavings';
import RetirementPlan from '@/components/simulator/RetirementPlan';

export default function BasicSimulation() {
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
        <DailyExpense />
        <FixedCharges />
        <AdditionalSavings />
        <RetirementPlan />
      </div>
    </div>
  );
}
