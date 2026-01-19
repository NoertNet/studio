"use client";

import { Coffee, HelpCircle, Dices } from 'lucide-react';

type DiceDisplayProps = {
  value: string | number;
};

export function DiceDisplay({ value }: DiceDisplayProps) {
  const displayContent = () => {
    switch (value) {
      case '☕':
        return <Coffee className="h-24 w-24 text-primary/90" strokeWidth={1.5} aria-label="Coffee Break" />;
      case '?':
        return <HelpCircle className="h-24 w-24 text-primary/90" strokeWidth={1.5} aria-label="Question Mark" />;
      case '🎲':
         return <Dices className="h-24 w-24 text-primary/90" strokeWidth={1.5} aria-label="Dice icon" />;
      default:
        return (
          <span className="font-headline text-8xl font-bold text-primary">
            {value}
          </span>
        );
    }
  };

  return (
    <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-background p-4 shadow-inner">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-card shadow-sm transition-all duration-100 ease-in-out">
        {/* Using a key on this div will re-trigger the animation when `value` changes */}
        <div key={value.toString()} className="animate-in fade-in zoom-in-75 duration-200">
          {displayContent()}
        </div>
      </div>
    </div>
  );
}
