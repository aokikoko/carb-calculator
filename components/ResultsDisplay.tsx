
"use client";

import { useI18n } from "@/lib/i18n";
import { WeeklyPlan, DayType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Just in case, but I can use simple classes

interface ResultsDisplayProps {
  plan: WeeklyPlan;
}

export function ResultsDisplay({ plan }: ResultsDisplayProps) {
  const { t } = useI18n();

  const getDayLabel = (index: number) => {
    const days = [
        t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday, t.sunday
    ];
    return days[index];
  };

  const getTypeLabel = (type: DayType) => {
    switch (type) {
      case 'high_carb': return <span className="text-green-600 font-bold">{t.highCarb}</span>;
      case 'medium_carb': return <span className="text-yellow-600 font-bold">{t.mediumCarb}</span>;
      case 'low_carb': return <span className="text-red-600 font-bold">{t.lowCarb}</span>;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{t.results}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>{t.bodyType}</TableHead>
              <TableHead>{t.carbs} (g)</TableHead>
              <TableHead>{t.protein} (g)</TableHead>
              <TableHead>{t.fat} (g)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plan.dailyPlans.map((day, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{getDayLabel(index)}</TableCell>
                <TableCell>{getTypeLabel(day.dayType)}</TableCell>
                <TableCell>{day.carbs.toFixed(1)}</TableCell>
                <TableCell>{day.protein.toFixed(1)}</TableCell>
                <TableCell>{day.fat.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
