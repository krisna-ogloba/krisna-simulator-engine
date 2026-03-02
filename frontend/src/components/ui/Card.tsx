import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl p-3 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
