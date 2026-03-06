interface CustomInputProps {
  value: number;
  onChange: (val: number) => void;
  borderClass?: string;
  textClass?: string;
  isMonthly?: boolean;
  width?: string;
  unit: string;
}

export default function Input({
  value,
  onChange,
  borderClass = 'border-gray-400',
  textClass = 'text-gray-400',
  isMonthly = true,
  unit = '€',
}: CustomInputProps) {
  const annualValue = value * 12;
  const displayValue = value === 0 ? '' : value.toString();

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex items-center min-w-fit p-1 rounded-lg border-2 bg-white shadow-sm transition-all ${borderClass}`}
      >
        <div className="relative flex items-center w-full">
          <span className="invisible whitespace-pre font-bold text-[16px] px-1">
            {displayValue || '0'}
          </span>

          <input
            type="number"
            inputMode="numeric"
            value={value === 0 ? '' : value}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="0"
            className="absolute inset-0 w-full font-bold text-[16px] text-black outline-none bg-transparent text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
          />
        </div>

        <div className="flex items-center ml-1 shrink-0">
          <span
            className={`text-[16px] font-bold text-black ${!isMonthly ? 'mr-2' : ''}`}
          >
            {unit}
          </span>
          {isMonthly && (
            <span className="text-[12px] font-light text-black ml-0.5 mr-2">
              /mois
            </span>
          )}
        </div>
      </div>
      {isMonthly && (
        <p className={`${textClass} font-medium text-[10px] italic pr-2`}>
          soit {annualValue}€/an
        </p>
      )}
    </div>
  );
}
