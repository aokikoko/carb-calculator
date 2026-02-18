
"use client";

import { useI18n } from "@/lib/i18n";
import { WeeklyPlan, DayType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge"; // Just in case, but I can use simple classes

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t.results}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[180px]">{t.bodyType}</TableHead>
              <TableHead>{t.carbs} (g)</TableHead>
              <TableHead>{t.protein} (g)</TableHead>
              <TableHead>{t.fat} (g)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plan.dailyPlans.map((day, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{getDayLabel(index)}</TableCell>
                <TableCell>
                  <Select
                    value={day.dayType}
                    onValueChange={(value) => onUpdateDay(index, value as DayType)}
                  >
                    <SelectTrigger className="w-[175px]">
                      {day.dayType === 'high_carb' && <span className="text-green-600 font-bold">{t.highCarb}</span>}
                      {day.dayType === 'medium_carb' && <span className="text-yellow-600 font-bold">{t.mediumCarb}</span>}
                      {day.dayType === 'low_carb' && <span className="text-red-600 font-bold">{t.lowCarb}</span>}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_carb">
                        <span className="text-green-600 font-bold">{t.highCarb}</span>
                      </SelectItem>
                      <SelectItem value="medium_carb">
                        <span className="text-yellow-600 font-bold">{t.mediumCarb}</span>
                      </SelectItem>
                      <SelectItem value="low_carb">
                        <span className="text-red-600 font-bold">{t.lowCarb}</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{day.carbs.toFixed(1)}</TableCell>
                <TableCell>{day.protein.toFixed(1)}</TableCell>
                <TableCell>{day.fat.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        
        {plan.weeklyTotals && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">{t.weeklyTotals}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg dark:bg-slate-900 border">
                <p className="text-sm text-muted-foreground mb-1">{t.totalCarbs}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {plan.weeklyTotals.carbs.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">g</span>
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg dark:bg-slate-900 border">
                <p className="text-sm text-muted-foreground mb-1">{t.totalProtein}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {plan.weeklyTotals.protein.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">g</span>
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg dark:bg-slate-900 border">
                <p className="text-sm text-muted-foreground mb-1">{t.totalFat}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {plan.weeklyTotals.fat.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">g</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
