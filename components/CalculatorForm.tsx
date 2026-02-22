"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { UserData, BodyType, Goal, CycleMode } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PersonStanding, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorFormProps {
  onCalculate: (data: UserData) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const { t } = useI18n();
  const [weight, setWeight] = useState<string>("70");
  const [bodyType, setBodyType] = useState<BodyType>("ectomorph");
  const [goal, setGoal] = useState<Goal>("beginner_female");
  const [mode, setMode] = useState<CycleMode>("maintenance");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!weight) {
      setError(t.weightRequired);
      return;
    }
    setError(null);
    onCalculate({
      weight: parseFloat(weight),
      bodyType,
      goal,
      mode,
    });
  };

  return (
    <div className="w-full rounded-[1.5rem] bg-zinc-950 border border-orange-500/20 p-6 shadow-[0_0_40px_rgba(249,115,22,0.12)] relative transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.25)] hover:border-orange-500/40">
      <div className="relative z-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 mb-6 bg-zinc-950 pb-4 border-b border-zinc-800 -mx-6 px-6 pt-2">{t.yourStats}</h2>
          
          <div className="space-y-6">
            {/* Weight Input */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-zinc-400 text-sm font-medium">{t.weight}</Label>
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-zinc-500 hover:text-zinc-300 transition-colors cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                      <p className="text-sm">{t.targetWeightTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    if (e.target.value) setError(null);
                  }}
                  className={cn(
                    "bg-zinc-900 border-zinc-800 h-12 text-lg px-4 text-zinc-100 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    error ? "border-red-500" : ""
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 font-medium pointer-events-none">
                  kg
                </div>
              </div>
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            </div>

            {/* Body Type Selection */}
            <div className="space-y-3">
              <Label className="text-zinc-400 text-sm font-medium">{t.bodyType}</Label>
              <div className="grid grid-cols-3 gap-3">
                {(['ectomorph', 'mesomorph', 'endomorph'] as BodyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBodyType(type)}
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all cursor-pointer relative",
                      bodyType === type 
                        ? "bg-orange-500/10 border-orange-500 text-orange-500 shadow-[inset_0_0_15px_rgba(249,115,22,0.1)]" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    )}
                  >
                    <PersonStanding className={cn(
                      "h-8 w-8 mb-2", 
                      bodyType === type && type === "endomorph" ? "scale-125" : 
                      bodyType === type && type === "mesomorph" ? "scale-110" : ""
                    )} />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                       {type === 'ectomorph' ? t.ectomorph : type === 'mesomorph' ? t.mesomorph : t.endomorph}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Advanced configurations */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
               <Label className="text-zinc-400 text-sm font-medium">{t.goal}</Label>
               <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
                  <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-zinc-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                    <SelectItem value="beginner_female" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.beginner_female}</SelectItem>
                    <SelectItem value="high_muscle" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.high_muscle}</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
               <Label className="text-zinc-400 text-sm font-medium">{t.cycleMode}</Label>
               <Select value={mode} onValueChange={(v) => setMode(v as CycleMode)}>
                  <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-zinc-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                    <SelectItem value="maintenance" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.maintenance}</SelectItem>
                    <SelectItem value="fat_loss" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.fat_loss}</SelectItem>
                    <SelectItem value="muscle_gain" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.muscle_gain}</SelectItem>
                    <SelectItem value="custom" className="hover:bg-zinc-800 focus:bg-zinc-800">{t.custom}</SelectItem>
                  </SelectContent>
                </Select>
            </div>

          </div>
        </div>

        <Button 
          onClick={() => handleSubmit()}
          className="w-full h-14 rounded-xl bg-orange-600 hover:bg-orange-500 text-zinc-50 font-bold text-base shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-all uppercase tracking-wider flex items-center justify-center mt-8 cursor-pointer relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            CALCULATE MY PLAN 
            <Zap className="ml-2 h-5 w-5 fill-yellow-300 text-yellow-400 group-hover:scale-110 transition-transform" />
          </span>
        </Button>
      </div>
    </div>
  );
}
