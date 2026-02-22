
import { useState } from 'react';
import { UserData, WeeklyPlan, DailyPlan, DayType } from '@/lib/types';

export function useCalculator() {
  const [result, setResult] = useState<WeeklyPlan | null>(null);

  const generateTemplates = (data: UserData) => {
    const { weight, bodyType, goal } = data;

    // 1. Calculate Baselines
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

    // Protein
    const proteinMultiplier = goal === 'beginner_female' ? 1.2 : 1.5;
    const dailyProtein = weight * proteinMultiplier;

    return {
      high_carb: {
        dayType: 'high_carb' as DayType,
        carbs: (weeklyCarbTotal * 0.50) / 2, // Base allocation for 2 high days
        fat: (weeklyFatTotal * 0.15) / 2,
        protein: dailyProtein,
      },
      medium_carb: {
        dayType: 'medium_carb' as DayType,
        carbs: (weeklyCarbTotal * 0.35) / 3, // Base allocation for 3 medium days
        fat: (weeklyFatTotal * 0.35) / 3,
        protein: dailyProtein,
      },
      low_carb: {
        dayType: 'low_carb' as DayType,
        carbs: (weeklyCarbTotal * 0.15) / 2, // Base allocation for 2 low days
        fat: (weeklyFatTotal * 0.50) / 2,
        protein: dailyProtein,
      },
    };
  };

  const calculate = (data: UserData) => {
    const templates = generateTemplates(data);
    const { high_carb, medium_carb, low_carb } = templates;
    const mode = data.mode || 'maintenance';

    // Generate Schedule based on Mode
    let schedule: DailyPlan[] = [];

    if (mode === 'fat_loss') {
      // Fat Loss: 1 High, 4 Low, 2 Medium
      // Example: Mon(Low), Tue(Low), Wed(High), Thu(Low), Fri(Low), Sat(Med), Sun(Med)
      schedule = [
        { ...low_carb },  // Mon
        { ...low_carb },  // Tue
        { ...high_carb }, // Wed
        { ...low_carb },  // Thu
        { ...low_carb },  // Fri
        { ...medium_carb }, // Sat
        { ...medium_carb }, // Sun
      ];
    } else if (mode === 'muscle_gain') {
      // Muscle Gain: 4 High, 1 Low, 2 Medium
      // Example: Mon(High), Tue(High), Wed(Low), Thu(High), Fri(High), Sat(Med), Sun(Med)
      schedule = [
        { ...high_carb }, // Mon
        { ...high_carb }, // Tue
        { ...low_carb },  // Wed
        { ...high_carb }, // Thu
        { ...high_carb }, // Fri
        { ...medium_carb }, // Sat
        { ...medium_carb }, // Sun
      ];
    } else {
      // Maintenance (Default) or Custom (starts as Maintenance)
      // 2 High, 2 Low, 3 Medium
      // Example: Mon(High), Tue(Low), Wed(Med), Thu(High), Fri(Low), Sat(Med), Sun(Med)
      schedule = [
        { ...high_carb }, // Mon
        { ...low_carb },  // Tue
        { ...medium_carb }, // Wed
        { ...high_carb }, // Thu
        { ...low_carb },  // Fri
        { ...medium_carb }, // Sat
        { ...medium_carb }, // Sun
      ];
    }

    const initialTotals = calculateWeeklyTotals(schedule);

    setResult({
      userData: data,
      dailyPlans: schedule,
      weeklyTotals: initialTotals,
      dayTemplates: templates,
    });
  };

  const updateDay = (dayIndex: number, newType: DayType) => {
    if (!result) return;

    // Ensure templates exist (handle stale state)
    let templates = result.dayTemplates;
    if (!templates) {
      templates = generateTemplates(result.userData);
    }

    const newSchedule = [...result.dailyPlans];
    // Use the template for the selected day type
    newSchedule[dayIndex] = { ...templates[newType] };

    const newTotals = calculateWeeklyTotals(newSchedule);

    setResult({
      ...result,
      dailyPlans: newSchedule,
      weeklyTotals: newTotals,
      dayTemplates: templates,
    });
  };

  const calculateWeeklyTotals = (dailyPlans: DailyPlan[]) => {
    return dailyPlans.reduce(
      (acc, day) => ({
        carbs: acc.carbs + day.carbs,
        protein: acc.protein + day.protein,
        fat: acc.fat + day.fat,
      }),
      { carbs: 0, protein: 0, fat: 0 }
    );
  };

  return {
    calculate,
    updateDay,
    result,
  };
}
