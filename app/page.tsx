"use client";

import { useI18n } from "@/lib/i18n";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Calculator } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const { t } = useI18n();
  const { calculate, result, updateDay } = useCalculator();

  return (
    <div className="w-full flex flex-col relative pb-12">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-extrabold text-zinc-100 mb-4 tracking-tight">
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
            <div className="w-full h-full relative animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-6 duration-700 ease-out fill-mode-both" style={{ WebkitTransform: "translate3d(0,0,0)", transform: "translate3d(0,0,0)" }}>
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

      {/* FAQ Section Always Visible */}
      <div className="w-full mt-8 animate-in fade-in duration-500">
        <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight mb-6">{t.faqTitle}</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-zinc-800">
              <AccordionTrigger className="text-zinc-200 hover:text-zinc-100 hover:no-underline text-left font-semibold">
                {t.faq1}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed text-sm">
                {t.faq1Answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-zinc-800">
              <AccordionTrigger className="text-zinc-200 hover:text-zinc-100 hover:no-underline text-left font-semibold">
                {t.faq2}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed text-sm">
                {t.faq2Answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-zinc-800 border-b-0">
              <AccordionTrigger className="text-zinc-200 hover:text-zinc-100 hover:no-underline text-left font-semibold">
                {t.faq3}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 leading-relaxed text-sm pt-4 pb-2">
                {t.faq3Answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
