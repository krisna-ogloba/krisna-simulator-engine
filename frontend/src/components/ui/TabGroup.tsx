interface TabProps {
  options: string[];
  activeValue: string;
  onChange: (val: string) => void;
  activeClass?: string;
}

export function TabGroup({
  options,
  activeValue,
  onChange,
  activeClass = 'bg-[#F9EBE7]',
}: TabProps) {
  return (
    <div className="flex p-1 bg-white border border-gray-100 rounded-xl shadow-sm w-full gap-2">
      {options.map((option) => {
        const isActive = activeValue === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
            flex-1 min-w-0
            p-2 rounded-md text-[10px] uppercase
              transition-all 
              text-black 
              leading-tight wrap-break-word
              ${isActive ? `${activeClass} shadow-sm` : 'bg-transparent'}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
