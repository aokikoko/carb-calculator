
"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { UserData, BodyType, Goal } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalculatorFormProps {
  onCalculate: (data: UserData) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const { t } = useI18n();
  const [weight, setWeight] = useState<string>("");
  const [bodyType, setBodyType] = useState<BodyType>("ectomorph");
  const [goal, setGoal] = useState<Goal>("beginner_female");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;
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
            <Label htmlFor="weight">{t.weight}</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
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
                <SelectValue />
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
