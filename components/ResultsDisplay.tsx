"use client";

import { useI18n } from "@/lib/i18n";
import { WeeklyPlan, DayType, DailyPlan } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  plan: WeeklyPlan;
  onUpdateDay: (dayIndex: number, newType: DayType) => void;
}

export function ResultsDisplay({ plan }: ResultsDisplayProps) {
  const { t } = useI18n();

  const calculateKcal = (day: DailyPlan) => {
    return Math.round((day.protein * 4) + (day.carbs * 4) + (day.fat * 9));
  };

  const getDayLabel = (type: DayType) => {
    switch(type) {
      case 'high_carb': return 'High Day (Refeed)';
      case 'medium_carb': return 'Medium Day';
      case 'low_carb': return 'Low Day';
    }
  };

  const Card = ({ title, type, day, colorClass, highlightClass }: { title: string, type: DayType, day: DailyPlan, colorClass: string, highlightClass: string }) => {
    const kcal = calculateKcal(day);
    return (
      <div className={cn("p-6 rounded-[1.25rem] border bg-zinc-950 flex flex-col space-y-6 flex-1 transition-all hover:border-zinc-700", "border-zinc-800")}>
        <div className="flex justify-between items-center">
            <h3 className="text-zinc-200 font-bold">{title}</h3>
            <Badge variant="outline" className={cn("font-bold uppercase tracking-wider text-[10px]", colorClass)}>
              {getDayLabel(type)}
            </Badge>
        </div>
        
        <div className="flex flex-col border-b border-zinc-800 pb-5">
          <span className="text-[2.5rem] leading-none font-extrabold text-white tracking-tighter">
            {kcal.toLocaleString()}
          </span>
          <span className="text-zinc-500 font-semibold mt-1">kcal</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
             <div className="flex justify-between text-xs font-bold text-zinc-300">
               <span>Protein</span>
               <span>{Math.round(day.protein)}g</span>
             </div>
             <Progress value={Math.min(100, (day.protein / 250) * 100)} indicatorClassName="bg-red-500" />
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-xs font-bold text-zinc-300">
               <span>Carbs</span>
               <span className={highlightClass}>{Math.round(day.carbs)}g</span>
             </div>
             <Progress value={Math.min(100, (day.carbs / 400) * 100)} indicatorClassName={highlightClass} />
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-xs font-bold text-zinc-300">
               <span>Fat</span>
               <span>{Math.round(day.fat)}g</span>
             </div>
             <Progress value={Math.min(100, (day.fat / 120) * 100)} indicatorClassName="bg-yellow-500" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-12 pb-12">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title={t.highCarb} 
            type="high_carb" 
            day={plan.dayTemplates.high_carb} 
            colorClass="text-green-500 border-green-500/30 bg-green-500/10"
            highlightClass="text-orange-500 bg-orange-500"
          />
          <Card 
            title={t.mediumCarb} 
            type="medium_carb" 
            day={plan.dayTemplates.medium_carb} 
            colorClass="text-yellow-500 border-yellow-500/30 bg-yellow-500/10"
            highlightClass="text-orange-500 bg-orange-500"
          />
          <Card 
            title={t.lowCarb} 
            type="low_carb" 
            day={plan.dayTemplates.low_carb} 
            colorClass="text-red-500 border-red-500/30 bg-red-500/10"
            highlightClass="text-orange-500 bg-orange-500"
          />
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-zinc-900/50">
        <h2 className="text-2xl font-bold text-white tracking-tight">{t.faqTitle}</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-white hover:no-underline text-left font-semibold">
              {t.faq1}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400 leading-relaxed text-sm">
              {t.faq1Answer}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-zinc-800">
            <AccordionTrigger className="text-zinc-200 hover:text-white hover:no-underline text-left font-semibold">
              {t.faq2}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400 leading-relaxed text-sm">
              {t.faq2Answer}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-zinc-800 border-b-0">
            <AccordionTrigger className="text-zinc-200 hover:text-white hover:no-underline text-left font-semibold">
              {t.faq3}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-400 leading-relaxed text-sm">
              {t.faq3Answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
