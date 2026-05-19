export type TaskCategory =
  | "Transport"
  | "Vesi"
  | "Elekter"
  | "Toit"
  | "Tarbimine"
  | "Prügi ja taaskasutus"
  | "Loodus";

export type TaskStatus = "pending" | "completed" | "skipped";
export type Difficulty = "Lihtne" | "Keskmine" | "Väljakutse";
export type ScreenKey = "home" | "tasks" | "leaderboard" | "calendar" | "rewards" | "impact";

export type EcoTask = {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  points: number;
  co2ReductionKg: number;
  difficulty: Difficulty;
  estimatedTime: string;
  status: TaskStatus;
};

export type UserStats = {
  name: string;
  points: number;
  totalCo2Reduced: number;
  completedTasks: number;
  skippedTasks: number;
  currentStreak: number;
  longestStreak: number;
  rewardBalance: number;
  waterSavedLiters: number;
  electricitySavedKwh: number;
};

export type CalendarEntry = {
  date: string;
  status: TaskStatus;
  taskTitle: string;
  co2ReductionKg: number;
};

export type LeaderboardUser = {
  id: string;
  rank: number;
  avatar: string;
  name: string;
  totalCo2Reduced: number;
  totalPoints: number;
  isCurrentUser?: boolean;
};

export type Reward = {
  id: string;
  points: number;
  euros: number;
  title: string;
};
