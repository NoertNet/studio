"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DiceDisplay } from '@/components/dice-display';
import { Dices } from 'lucide-react';

const fibonacciValues = ['1', '2', '3', '5', '8', '13', '21', '☕'];

const genericReasons = [
  "This considers the foundational effort required.",
  "Factoring in the core complexity of the task.",
  "Reflects the necessary setup and initial work.",
  "Accounts for the interdependencies with other components.",
  "Based on the level of uncertainty and potential unknowns.",
  "This value represents the need for some research and investigation.",
  "A good balance between effort and expected outcome.",
  "Considers the need for collaboration and communication.",
  "This accounts for the testing and quality assurance phase.",
  "A realistic estimate given the current constraints.",
  "Reflects the amount of detailed work involved.",
  "This captures the effort for both implementation and documentation.",
  "A standard value for tasks of this nature.",
  "Factoring in potential edge cases and handling them.",
  "This estimate allows for a robust and scalable solution.",
  "Accounts for the required learning curve for new technologies.",
  "This value considers the end-to-end delivery of the feature.",
  "A pragmatic choice to ensure steady progress.",
  "Reflects the need for careful planning and design upfront.",
  "This is a conservative estimate to mitigate risks.",
  "An optimistic yet achievable target.",
  "Because the stars aligned this way."
];

export default function Home() {
  const [currentValue, setCurrentValue] = useState<string | number>('🎲');
  const [reasoning, setReasoning] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setReasoning('');

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fibonacciValues.length);
      setCurrentValue(fibonacciValues[randomIndex]);
    }, 100);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const finalIndex = Math.floor(Math.random() * fibonacciValues.length);
      const finalValue = fibonacciValues[finalIndex];
      setCurrentValue(finalValue);

      if(finalValue !== '☕' && finalValue !== '🎲') {
        const randomReasonIndex = Math.floor(Math.random() * genericReasons.length);
        setReasoning(genericReasons[randomReasonIndex]);
      } else {
        setReasoning('');
      }

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
            <DiceDisplay value={currentValue} isRolling={isRolling} />
        </CardContent>
        {reasoning && (
          <CardContent className="text-center">
            <p className="text-sm font-medium">Reasoning:</p>
            <p className="text-muted-foreground">{reasoning}</p>
          </CardContent>
        )}
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
