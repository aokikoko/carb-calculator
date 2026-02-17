
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type Goal = 'beginner_female' | 'high_muscle';
export type DayType = 'high_carb' | 'medium_carb' | 'low_carb';

export interface UserData {
  weight: number; // in kg
  bodyType: BodyType;
  goal: Goal;
}

export interface DailyPlan {
  dayType: DayType;
  carbs: number;
  protein: number;
  fat: number;
}

export interface WeeklyPlan {
  userData: UserData;
  dailyPlans: DailyPlan[]; // Array of 7 days
}

export const LABELS = {
  en: {
    title: "Carb Cycling Calculator",
    weight: "Weight (kg)",
    bodyType: "Body Type",
    ectomorph: "Ectomorph (Hard gainer)",
    mesomorph: "Mesomorph (Athletic)",
    endomorph: "Endomorph (Easy gainer)",
    goal: "Goal / Level",
    beginner_female: "Beginner / Female",
    high_muscle: "High Muscle Mass (>100kg Bench press)",
    calculate: "Calculate Plan",
    results: "Weekly Nutrition Plan",
    highCarb: "High Carb Day",
    mediumCarb: "Medium Carb Day",
    lowCarb: "Low Carb Day",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },
  zh: {
    title: "碳水循环计算器",
    weight: "体重 (kg)",
    bodyType: "体型",
    ectomorph: "外胚型 (不易胖/增肌困难)",
    mesomorph: "中胚型 (运动型/增肌减脂容易)",
    endomorph: "内胚型 (易胖/代谢较慢)",
    goal: "目标 / 阶段",
    beginner_female: "新手 / 女生",
    high_muscle: "大肌肉量者 (卧推>100kg)",
    calculate: "计算计划",
    results: "每周营养计划",
    highCarb: "高碳日",
    mediumCarb: "中碳日",
    lowCarb: "低碳日",
    protein: "蛋白质",
    carbs: "碳水",
    fat: "脂肪",
    monday: "周一",
    tuesday: "周二",
    wednesday: "周三",
    thursday: "周四",
    friday: "周五",
    saturday: "周六",
    sunday: "周日",
  }
};

export type Language = 'en' | 'zh';
