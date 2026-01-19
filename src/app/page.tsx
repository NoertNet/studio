"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DiceDisplay } from '@/components/dice-display';
import { Dices } from 'lucide-react';

const fibonacciValues = ['1', '2', '3', '5', '8', '13', '☕'];

const genericReasons = [
  "Berücksichtigt den grundlegenden Aufwand.",
  "Spiegelt die Kernkomplexität der Aufgabe wider.",
  "Beinhaltet die notwendige Einrichtung und Vorarbeit.",
  "Berücksichtigt die Abhängigkeiten von anderen Komponenten.",
  "Basiert auf der Unsicherheit und potenziellen Unbekannten.",
  "Dieser Wert steht für den Bedarf an Recherche und Untersuchung.",
  "Eine gute Balance zwischen Aufwand und erwartetem Ergebnis.",
  "Berücksichtigt den Bedarf an Zusammenarbeit und Kommunikation.",
  "Deckt die Test- und Qualitätssicherungsphase ab.",
  "Eine realistische Schätzung unter den gegebenen Umständen.",
  "Spiegelt den Umfang der Detailarbeit wider.",
  "Erfasst den Aufwand für Implementierung und Dokumentation.",
  "Ein Standardwert für Aufgaben dieser Art.",
  "Berücksichtigt potenzielle Randfälle und deren Behandlung.",
  "Diese Schätzung ermöglicht eine robuste und skalierbare Lösung.",
  "Berücksichtigt die Einarbeitungszeit für neue Technologien.",
  "Dieser Wert berücksichtigt die End-to-End-Bereitstellung des Features.",
  "Eine pragmatische Wahl, um stetigen Fortschritt zu gewährleisten.",
  "Spiegelt die Notwendigkeit sorgfältiger Planung und Konzeption wider.",
  "Eine konservative Schätzung zur Risikominderung.",
  "Ein optimistisches, aber erreichbares Ziel.",
  "Weil die Sterne gerade günstig stehen.",
  "Die Schätzung deckt die Integration mit externen Systemen ab.",
  "Basiert auf Erfahrungen mit ähnlichen Aufgaben in der Vergangenheit.",
  "Einbeziehung von Pufferzeiten für unvorhergesehene Probleme.",
  "Der Wert berücksichtigt die erforderlichen Code-Reviews.",
  "Eine Schätzung, die auf die Teamgeschwindigkeit abgestimmt ist.",
  "Deckt die Notwendigkeit ab, bestehenden Code zu refaktorisieren.",
  "Setzt einen gewissen Grad an technischer Schuld voraus.",
  "Berücksichtigt die Anforderungen an die Barrierefreiheit.",
  "Spiegelt die Komplexität der Geschäftslogik wider.",
  "Die Datenmigration wurde in dieser Schätzung berücksichtigt.",
  "Erfordert die Erstellung neuer UI-Komponenten.",
  "Eine Schätzung, die mit den Stakeholdern abgestimmt wurde.",
  "Beinhaltet den Aufwand für das Aufsetzen der Entwicklungsumgebung.",
  "Der Wert passt zur strategischen Bedeutung der Aufgabe.",
  "Abhängig von der Verfügbarkeit eines Fachexperten.",
  "Berücksichtigt die Performance-Anforderungen.",
  "Die Komplexität der Algorithmen wurde einkalkuliert.",
  "Erfordert manuelle Tests auf verschiedenen Geräten.",
  "Eine Kompromisslösung zwischen Geschwindigkeit und Qualität.",
  "Weil das Bauchgefühl das sagt."
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
          <CardTitle className="font-headline text-3xl tracking-tight">Fibonacci Würfel</CardTitle>
          <CardDescription>Für deine agilen Schätzungen</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
            <DiceDisplay value={currentValue} isRolling={isRolling} />
        </CardContent>
        {reasoning && (
          <CardContent className="text-center">
            <p className="text-sm font-medium">Begründung:</p>
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
            {isRolling ? 'Würfle...' : 'Würfeln'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
