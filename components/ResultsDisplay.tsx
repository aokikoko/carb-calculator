"use client";

import { useI18n } from "@/lib/i18n";
import { WeeklyPlan, DayType, DailyPlan } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResultsDisplayProps {
  plan: WeeklyPlan;
  onUpdateDay: (dayIndex: number, newType: DayType) => void;
}

export function ResultsDisplay({ plan, onUpdateDay }: ResultsDisplayProps) {
  const { t } = useI18n();

  const getDayLabel = (index: number) => {
    const days = [
      t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday, t.sunday
    ];
    return days[index];
  };

  return (
    <div className="w-full space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">{t.results}</h2>
        
        <div className="rounded-[1.25rem] border border-zinc-800 bg-zinc-950 p-1">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[100px] text-zinc-400 font-semibold"></TableHead>
                <TableHead className="w-[180px] text-zinc-400 font-semibold">{t.bodyType}</TableHead>
                <TableHead className="text-zinc-400 font-semibold">{t.carbs} (g)</TableHead>
                <TableHead className="text-zinc-400 font-semibold">{t.protein} (g)</TableHead>
                <TableHead className="text-zinc-400 font-semibold">{t.fat} (g)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plan.dailyPlans.map((day, index) => (
                <TableRow key={index} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="font-medium text-zinc-300">{getDayLabel(index)}</TableCell>
                  <TableCell className="relative z-10 w-[175px]">
                    <Select
                      value={day.dayType}
                      onValueChange={(value) => onUpdateDay(index, value as DayType)}
                    >
                      <SelectTrigger className="w-full bg-zinc-950 border-zinc-700 text-zinc-200">
                        <SelectValue>
                          {day.dayType === 'high_carb' && <span className="text-emerald-500 font-bold">{t.highCarb}</span>}
                          {day.dayType === 'medium_carb' && <span className="text-amber-500 font-bold">{t.mediumCarb}</span>}
                          {day.dayType === 'low_carb' && <span className="text-red-500 font-bold">{t.lowCarb}</span>}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectGroup>
                          <SelectItem value="high_carb" className="focus:bg-zinc-800 focus:text-emerald-400 cursor-pointer">
                            <span className="text-emerald-500 font-bold">{t.highCarb}</span>
                          </SelectItem>
                          <SelectItem value="medium_carb" className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer">
                            <span className="text-amber-500 font-bold">{t.mediumCarb}</span>
                          </SelectItem>
                          <SelectItem value="low_carb" className="focus:bg-zinc-800 focus:text-red-400 cursor-pointer">
                            <span className="text-red-500 font-bold">{t.lowCarb}</span>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-zinc-200 font-medium">{day.carbs.toFixed(1)}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{day.protein.toFixed(1)}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{day.fat.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {plan.weeklyTotals && (
          <div className="pt-1">
            <h3 className="text-xl font-bold text-zinc-100 mb-4 tracking-tight">{t.weeklyTotals}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">{t.totalCarbs}</p>
                <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
                  {plan.weeklyTotals.carbs.toFixed(0)} <span className="text-lg font-medium text-zinc-500 ml-1">g</span>
                </p>
              </div>
              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">{t.totalProtein}</p>
                <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
                  {plan.weeklyTotals.protein.toFixed(0)} <span className="text-lg font-medium text-zinc-500 ml-1">g</span>
                </p>
              </div>
              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center">
                <p className="text-sm font-medium text-zinc-400 mb-2">{t.totalFat}</p>
                <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
                  {plan.weeklyTotals.fat.toFixed(0)} <span className="text-lg font-medium text-zinc-500 ml-1">g</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
