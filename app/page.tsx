
"use client";

import { useState } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { LanguageToggle } from "@/components/LanguageToggle";

function CalculatorApp() {
  const { t } = useI18n();
  const { calculate, result } = useCalculator();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-6 border-b">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t.title}
          </h1>
          <LanguageToggle />
        </header>

        <main className="space-y-8">
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-[1fr_2fr] items-start">
                 <div className="w-full">
                    <CalculatorForm onCalculate={calculate} />
                 </div>
                 <div className="w-full">
                    {result ? (
                        <ResultsDisplay plan={result} />
                    ) : (
                        <div className="hidden lg:flex h-64 items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                            {t.calculate}
                        </div>
                    )}
                 </div>
            </div>
            
            {/* Mobile-only results placeholder if not shown above */}
             {result && (
                <div className="lg:hidden">
                    {/* Already rendered above in grid but if we want specific layout */}
                </div>
            )}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <CalculatorApp />
    </I18nProvider>
  );
}
