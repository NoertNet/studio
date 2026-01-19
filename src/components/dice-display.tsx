"use client";

import { Coffee, Dices } from 'lucide-react';
import { cn } from '@/lib/utils';

type DiceDisplayProps = {
  value: string | number;
  isRolling: boolean;
};

export function DiceDisplay({ value, isRolling }: DiceDisplayProps) {
  const displayContent = () => {
    switch (value) {
      case '☕':
        return <Coffee className="h-24 w-24 text-primary/90" strokeWidth={1.5} aria-label="Coffee Break" />;
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
    <div className={cn(
      "relative flex h-56 w-56 items-center justify-center rounded-3xl bg-background p-4 shadow-inner transition-transform duration-300",
      isRolling && 'animate-bounce'
    )}>
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-card shadow-sm transition-all duration-100 ease-in-out">
        {/* Using a key on this div will re-trigger the animation when `value` changes */}
        <div key={value.toString()} className="animate-in fade-in zoom-in-75 duration-200">
          {displayContent()}
        </div>
      </div>
    </div>
  );
}
