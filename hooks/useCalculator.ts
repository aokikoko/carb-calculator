
import { useState } from 'react';
import { UserData, WeeklyPlan, DailyPlan, DayType } from '@/lib/types';

export function useCalculator() {
  const [result, setResult] = useState<WeeklyPlan | null>(null);

  const calculate = (data: UserData) => {
    const { weight, bodyType, goal } = data;

    // 1. Calculate Baselines (Weekly Total or Daily Base)
    // Carbs
    let carbMultiplier;
    if (bodyType === 'ectomorph') carbMultiplier = 3;
    else if (bodyType === 'mesomorph') carbMultiplier = 2.5;
    else carbMultiplier = 2; // endomorph
    
    const dailyCarbBase = weight * carbMultiplier;
    const weeklyCarbTotal = dailyCarbBase * 7;

    // Fat
    let fatMultiplier;
    if (bodyType === 'ectomorph') fatMultiplier = 1;
    else if (bodyType === 'mesomorph') fatMultiplier = 0.9;
    else fatMultiplier = 0.8; // endomorph

    const dailyFatBase = weight * fatMultiplier;
    const weeklyFatTotal = dailyFatBase * 7;

    // Protein (Daily constant)
    // "Beginner/Female": 1.2g/kg
    // "High Muscle": 1.5g/kg
    const proteinMultiplier = goal === 'beginner_female' ? 1.2 : 1.5;
    const dailyProtein = weight * proteinMultiplier;

    // 2. Distribute per Day Type
    // High Carb (2 days)
    const highCarbDay: DailyPlan = {
      dayType: 'high_carb',
      carbs: (weeklyCarbTotal * 0.50) / 2,
      fat: (weeklyFatTotal * 0.15) / 2,
      protein: dailyProtein,
    };

    // Low Carb (2 days)
    const lowCarbDay: DailyPlan = {
      dayType: 'low_carb',
      carbs: (weeklyCarbTotal * 0.15) / 2,
      fat: (weeklyFatTotal * 0.50) / 2,
      protein: dailyProtein,
    };

    // Medium Carb (3 days)
    const mediumCarbDay: DailyPlan = {
      dayType: 'medium_carb',
      carbs: (weeklyCarbTotal * 0.35) / 3,
      fat: (weeklyFatTotal * 0.35) / 3,
      protein: dailyProtein,
    };

    // 3. Construct Weekly Plan (Example Schedule: Mon-Fri+Weekend)
    // A common schedule: High, Low, Medium, High, Low, Medium, Medium
    // Or: High (Legs), Low (Rest), Med (Push), High (Pull), Low (Rest), Med, Med
    // For simplicity, let's just return the definitions of the days for now,
    // OR return a fixed schedule. The prompt says "Distribute 2 High / 2 Low / 3 Medium per week".
    // I will return a schedule:
    // Mon: High
    // Tue: Low
    // Wed: Medium
    // Thu: High
    // Fri: Low
    // Sat: Medium
    // Sun: Medium

    const schedule: DailyPlan[] = [
      { ...highCarbDay }, // Mon
      { ...lowCarbDay },  // Tue
      { ...mediumCarbDay }, // Wed
      { ...highCarbDay }, // Thu
      { ...lowCarbDay },  // Fri
      { ...mediumCarbDay }, // Sat
      { ...mediumCarbDay }, // Sun
    ];

    setResult({
      userData: data,
      dailyPlans: schedule,
    });
  };

  return {
    calculate,
    result,
  };
}
