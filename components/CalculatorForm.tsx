
"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { UserData, BodyType, Goal } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalculatorFormProps {
  onCalculate: (data: UserData) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const { t } = useI18n();
  const [weight, setWeight] = useState<string>("");
  const [bodyType, setBodyType] = useState<BodyType>("ectomorph");
  const [goal, setGoal] = useState<Goal>("beginner_female");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) {
      setError(t.weightRequired);
      return;
    }
    setError(null);
    onCalculate({
      weight: parseFloat(weight),
      bodyType,
      goal,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t.calculate}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="weight">{t.weight}</Label>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.targetWeightTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                if (e.target.value) setError(null);
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>{t.bodyType}</Label>
            <RadioGroup 
              value={bodyType} 
              onValueChange={(v) => setBodyType(v as BodyType)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ectomorph" id="ectomorph" />
                <Label htmlFor="ectomorph">{t.ectomorph}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mesomorph" id="mesomorph" />
                <Label htmlFor="mesomorph">{t.mesomorph}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="endomorph" id="endomorph" />
                <Label htmlFor="endomorph">{t.endomorph}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>{t.goal}</Label>
            <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
              <SelectTrigger>
                {goal === 'beginner_female' && t.beginner_female}
                {goal === 'high_muscle' && t.high_muscle}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner_female">{t.beginner_female}</SelectItem>
                <SelectItem value="high_muscle">{t.high_muscle}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
