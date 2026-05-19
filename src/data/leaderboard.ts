import type { LeaderboardUser } from "../types";

export const leaderboardUsers: LeaderboardUser[] = [
  { id: "mari", rank: 1, avatar: "M", name: "Mari Kask", totalCo2Reduced: 48.7, totalPoints: 4680 },
  { id: "karl", rank: 2, avatar: "K", name: "Karl Saar", totalCo2Reduced: 39.3, totalPoints: 4215 },
  { id: "sina", rank: 3, avatar: "S", name: "Sina", totalCo2Reduced: 12.4, totalPoints: 720, isCurrentUser: true },
  { id: "liis", rank: 4, avatar: "L", name: "Liis Tamm", totalCo2Reduced: 10.9, totalPoints: 690 },
  { id: "rasmus", rank: 5, avatar: "R", name: "Rasmus Põld", totalCo2Reduced: 8.8, totalPoints: 610 }
];
