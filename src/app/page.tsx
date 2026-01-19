"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DiceDisplay } from '@/components/dice-display';
import { Dices } from 'lucide-react';

const fibonacciValues = ['1', '2', '3', '5', '8', '13', '21', '?', '☕'];

export default function Home() {
  const [currentValue, setCurrentValue] = useState<string | number>('🎲');
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fibonacciValues.length);
      setCurrentValue(fibonacciValues[randomIndex]);
    }, 100);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const finalIndex = Math.floor(Math.random() * fibonacciValues.length);
      setCurrentValue(fibonacciValues[finalIndex]);
      setIsRolling(false);
    }, 2000); // Roll for 2 seconds
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl tracking-tight">Fibonacci Dice Roller</CardTitle>
          <CardDescription>For your agile estimation needs</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
            <DiceDisplay value={currentValue} />
        </CardContent>
        <CardFooter className="p-6">
          <Button 
            className="w-full text-lg font-bold" 
            size="lg" 
            onClick={rollDice} 
            disabled={isRolling}
          >
            <Dices className="mr-2 h-5 w-5" />
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
