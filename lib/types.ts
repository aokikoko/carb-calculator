
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type Goal = 'beginner_female' | 'high_muscle';
export type DayType = 'high_carb' | 'medium_carb' | 'low_carb';
export type CycleMode = 'maintenance' | 'fat_loss' | 'muscle_gain' | 'custom';

export interface UserData {
  weight: number;
  bodyType: BodyType;
  goal: Goal;
  mode?: CycleMode;
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
  weeklyTotals: {
    carbs: number;
    protein: number;
    fat: number;
  };
  dayTemplates: Record<DayType, DailyPlan>; // Store the base macros for each day type
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
    beginner_female: "Beginner / Intermediate / Female",
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
    weeklyTotals: "Weekly Totals",
    totalCarbs: "Total Carbs",
    totalProtein: "Total Protein",
    totalFat: "Total Fat",
    targetWeightTooltip: "Enter your target weight or expected weight.",
    weightRequired: "Please enter your weight.",
    cycleMode: "Cycle Mode",
    maintenance: "Maintenance (2 High / 2 Low / 3 Medium)",
    fat_loss: "Fat Loss (1 High / 4 Low / 2 Medium)",
    muscle_gain: "Muscle Gain (4 High / 1 Low / 2 Medium)",
    custom: "Custom (Configure manually)",
    // New strings for UI layout
    nutritionTools: "NUTRITION TOOLS",
    macroCalculator: "Macro Calculator",
    creatineDosage: "Creatine Dosage",
    wheyProtein: "Whey Protein Planner",
    home: "Home",
    nutrition: "Nutrition",
    pageSubtitle: "Unlock your macro calculator to visualize the cycling success difference.",
    yourStats: "Your Stats",
    resultsDashboard: "Results Dashboard",
    faqTitle: "Frequently Asked Questions",
    faq1: "What is Carb Cycling Macro Calculator?",
    faq2: "What is Carb Cycling Macro Calculator?",
    faq3: "How good are Low Carb Day?",
    faq1Answer: "Carb cycling is a dietary approach in which you alternate carb intake on a daily, weekly, or monthly basis to lose fat, maintain physical performance while dieting, or overcome a weight loss plateau.",
    faq2Answer: "This calculator helps you determine your daily macronutrient needs based on your body type, goals, and cycle mode, offering tailored high, medium, and low carb day plans.",
    faq3Answer: "Low carb days help deplete glycogen stores and encourage the body to burn fat for energy, which is essential for the fat-loss phase of the carb cycling process.",
  },
  zh: {
    title: "碳水循环计算器",
    weight: "体重 (kg)",
    bodyType: "体型",
    ectomorph: "外胚型 (不易胖/增肌困难)",
    mesomorph: "中胚型 (运动型/增肌减脂容易)",
    endomorph: "内胚型 (易胖/代谢较慢)",
    goal: "目标 / 阶段",
    beginner_female: "新手 / 进阶者 / 女生",
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
    weeklyTotals: "周总摄入量",
    totalCarbs: "周总碳水",
    totalProtein: "周总蛋白质",
    totalFat: "周总脂肪",
    targetWeightTooltip: "请输入您的目标体重或预期体重。",
    weightRequired: "请输入您的体重。",
    cycleMode: "循环模式",
    maintenance: "维持模式 (2高 / 2低 / 3中)",
    fat_loss: "减脂模式 (1高 / 4低 / 2中)",
    muscle_gain: "增肌模式 (4高 / 1低 / 2中)",
    custom: "自定义模式 (手动配置)",
    // New strings for UI layout
    nutritionTools: "营养工具",
    macroCalculator: "宏量营养素计算器",
    creatineDosage: "肌酸用量",
    wheyProtein: "乳清蛋白计划",
    home: "首页",
    nutrition: "营养",
    pageSubtitle: "使用宏量计算器，感受碳水循环带来的直观改变。",
    yourStats: "您的数据",
    resultsDashboard: "结果面板",
    faqTitle: "常见问题",
    faq1: "什么是碳水循环宏量计算器？",
    faq2: "碳水循环宏量计算器有什么作用？",
    faq3: "低碳日有什么好处？",
    faq1Answer: "碳水循环是一种饮食策略，通过在每天、每周或每月交替改变碳水化合物的摄入量，以达到减脂、在节食期间保持运动表现或突破减肥平台期的目的。",
    faq2Answer: "这个计算器帮助您根据体型、目标和循环模式确定每日所需的宏量营养素，提供量身定制的高、中、低碳日计划。",
    faq3Answer: "低碳日有助于消耗体内的糖原储备，并促使身体燃烧脂肪作为能量，这是碳水循环过程中减脂阶段的重要组成部分。",
  }
};

export type Language = 'en' | 'zh';
