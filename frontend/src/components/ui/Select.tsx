import { useEffect, useMemo, useRef, useState } from 'react';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  value: string | number;
  options: SelectOption[];
  onChange: (value: string | number) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export default function Select({
  value,
  options,
  onChange,
  disabled = false,
  placeholder,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderMenu(true);
      const frameId = window.requestAnimationFrame(() => {
        setIsMenuVisible(true);
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    setIsMenuVisible(false);
    const timeoutId = window.setTimeout(() => {
      setShouldRenderMenu(false);
    }, 160);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  const displayLabel = selectedOption?.label ?? placeholder ?? '';

  return (
    <div ref={containerRef} className="relative inline-block min-w-30">
      <button
        type="button"
        className={`flex h-9 w-fit items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white pl-3 pr-2 text-[12px] text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 hover:shadow-sm focus:border-[#006F73] focus:shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${className}`}
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
      >
        <span className="truncate text-left">{displayLabel}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {shouldRenderMenu && !disabled ? (
        <div
          className={`absolute right-0 z-20 mt-1 max-h-56 min-w-full origin-top-right overflow-auto rounded-lg border border-gray-100 bg-white py-1 shadow-lg transition-all duration-150 ${
            isMenuVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-1 scale-95 opacity-0'
          }`}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-[12px] text-gray-400">
              {placeholder ?? 'Aucune option'}
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`flex w-full items-center px-3 py-2 text-left text-[12px] transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#E6F1F1] font-semibold text-[#006F73]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
