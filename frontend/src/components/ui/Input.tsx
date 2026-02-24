interface CustomInputProps {
  value: number;
  onChange: (val: number) => void;
  borderClass?: string;
  textClass?: string;
  isMonthly?: boolean;
}

export default function Input({
  value,
  onChange,
  borderClass = 'border-gray-400',
  textClass = 'text-gray-400',
  isMonthly = true,
}: CustomInputProps) {
  const annualValue = value * 12;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex items-centers w-25 p-2 rounded-lg border-2 bg-white shadow-sm transition-all ${borderClass}`}
      >
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="0"
          className="w-full text-sm font-bold text-black outline-none bg-transparent text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
        />

        <div className="flex items-baseline ml-1 shrink-0">
          <span className="text-sm font-bold text-black">€</span>
          {isMonthly && (
            <span className="text-[10px] font-light text-black ml-0.5">
              /mois
            </span>
          )}
        </div>
      </div>

      {isMonthly && (
        <p className={`${textClass} font-medium text-[10px] italic`}>
          soit {annualValue}€/an
        </p>
      )}
    </div>
  );
}
