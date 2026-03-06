import React from 'react';

import BackgroundVector from '@assets/background-vector.svg?react';

interface SimulatorCardProps {
  number: number;
  title: string;
  description: React.ReactNode;
  bgColor: string;
  badgeColor: string;
  children: React.ReactNode;
}

export default function SimulatorCard(props: SimulatorCardProps) {
  const { number, title, description, bgColor, badgeColor, children } = props;
  return (
    <div
      className="rounded-[18px] p-4.5 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <BackgroundVector
        className="absolute w-auto top-0 -right-27.5 h-60 pointer-events-none"
        style={{ stroke: badgeColor }}
      />
      <div className="relative z-10">
        <div className="flex items-start gap-4.5 mb-6">
          <div
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[18px] shrink-0"
            style={{ color: badgeColor }}
          >
            {number}
          </div>

          <div className="flex flex-col w-full gap-1">
            <h3 className="font-bold text-base text-gray-900">{title}</h3>
            <p className="text-xs font-medium text-gray-600">{description}</p>
          </div>

          <div className="relative shrink-0 group">
            <button
              className="text-gray-400 hover:text-gray-600"
              aria-label="Information"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                style={{ color: badgeColor }}
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M12 8v4m0 4h.01"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="absolute right-6.25 -top-3.75 mt-2 w-44 rounded-md bg-white p-2 text-[11px] text-gray-700 shadow-lg border border-gray-100 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
