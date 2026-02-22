"use client";

import { useI18n } from "@/lib/i18n";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Calculator } from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  const { calculate, result, updateDay } = useCalculator();

  return (
    <div className="w-full flex flex-col relative">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-extrabold text-white mb-4 tracking-tight">
          {t.title}
        </h1>
        <p className="text-zinc-400 max-w-2xl text-base">
          {t.pageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Side: Input Console (4/12) */}
        <div className="lg:col-span-4 animate-in fade-in slide-in-from-left-4 duration-500">
          <CalculatorForm onCalculate={calculate} />
        </div>

        {/* Right Side: Results Dashboard (8/12) */}
        <div className="lg:col-span-8 relative">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
               <ResultsDisplay plan={result} onUpdateDay={updateDay} />
            </div>
          ) : (
            <div className="w-full h-[400px] border border-zinc-800/60 rounded-[1.5rem] flex items-center justify-center flex-col text-zinc-500 gap-6 bg-zinc-950/20 mt-2">
              <div className="h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                 <Calculator className="h-8 w-8 text-zinc-600" />
              </div>
              <p className="font-medium text-center opacity-80 text-zinc-400">
                Enter your stats on the left to generate your cycling plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
