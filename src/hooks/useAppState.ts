import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { calendarEntries as seedCalendar } from "../data/calendar";
import { rewards } from "../data/rewards";
import { tasks as seedTasks } from "../data/tasks";
import type { CalendarEntry, EcoTask, UserStats } from "../types";
import { todayKey } from "../utils/date";

const STORAGE_KEY = "rohenapp:v1";

type StoredState = {
  dailyTaskId: string;
  tasks: EcoTask[];
  stats: UserStats;
  calendarEntries: CalendarEntry[];
  swappedToday: boolean;
};

const initialStats: UserStats = {
  name: "Laura",
  points: 720,
  totalCo2Reduced: 12.4,
  completedTasks: 14,
  skippedTasks: 2,
  currentStreak: 6,
  longestStreak: 9,
  rewardBalance: 0,
  waterSavedLiters: 118,
  electricitySavedKwh: 21
};

const initialState: StoredState = {
  dailyTaskId: "plant-meal",
  tasks: seedTasks.map((task, index) => ({
    ...task,
    status: index === 3 || index === 5 ? "completed" : index === 9 ? "skipped" : "pending"
  })),
  stats: initialStats,
  calendarEntries: seedCalendar,
  swappedToday: false
};

export const useAppState = () => {
  const [state, setState] = useState<StoredState>(initialState);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setState(JSON.parse(value));
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [state]);

  const dailyTask = useMemo(
    () => state.tasks.find((task) => task.id === state.dailyTaskId) ?? state.tasks[0],
    [state.dailyTaskId, state.tasks]
  );

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const completeDailyTask = () => {
    if (dailyTask.status === "completed") {
      showToast("Tänane ülesanne on juba tehtud.");
      return;
    }

    const date = todayKey();
    setState((current) => {
      const task = current.tasks.find((item) => item.id === current.dailyTaskId) ?? dailyTask;
      const nextTasks = current.tasks.map((item) =>
        item.id === task.id ? { ...item, status: "completed" as const } : item
      );
      const withoutToday = current.calendarEntries.filter((entry) => entry.date !== date);
      const rewardBalance = Math.floor((current.stats.points + task.points) / 1000);

      return {
        ...current,
        tasks: nextTasks,
        stats: {
          ...current.stats,
          points: current.stats.points + task.points,
          totalCo2Reduced: Number((current.stats.totalCo2Reduced + task.co2ReductionKg).toFixed(1)),
          completedTasks: current.stats.completedTasks + 1,
          currentStreak: current.stats.currentStreak + 1,
          longestStreak: Math.max(current.stats.longestStreak, current.stats.currentStreak + 1),
          rewardBalance,
          waterSavedLiters: current.stats.waterSavedLiters + (task.category === "Vesi" ? 45 : 6),
          electricitySavedKwh: current.stats.electricitySavedKwh + (task.category === "Elekter" ? 2.5 : 0.3)
        },
        calendarEntries: [
          ...withoutToday,
          {
            date,
            status: "completed",
            taskTitle: task.title,
            co2ReductionKg: task.co2ReductionKg
          }
        ]
      };
    });
    showToast("Tubli! Sinu mõju kasvab.");
  };

  const swapDailyTask = () => {
    setState((current) => {
      const candidates = current.tasks.filter(
        (task) => task.id !== current.dailyTaskId && task.status !== "completed"
      );
      const nextTask = candidates[Math.floor(Math.random() * candidates.length)] ?? current.tasks[0];
      return {
        ...current,
        dailyTaskId: nextTask.id,
        swappedToday: true,
        tasks: current.tasks.map((task) =>
          task.id === current.dailyTaskId && task.status === "pending"
            ? { ...task, status: "skipped" }
            : task.id === nextTask.id
              ? { ...task, status: "pending" }
              : task
        ),
        stats: {
          ...current.stats,
          skippedTasks: current.swappedToday ? current.stats.skippedTasks : current.stats.skippedTasks + 1
        }
      };
    });
    showToast("Uus ülesanne on valmis.");
  };

  const nextRewardThreshold =
    rewards.find((reward) => reward.points > state.stats.points)?.points ?? rewards[rewards.length - 1].points;
  const previousThreshold = [...rewards].reverse().find((reward) => reward.points <= state.stats.points)?.points ?? 0;
  const rewardProgress =
    nextRewardThreshold === previousThreshold
      ? 1
      : Math.min((state.stats.points - previousThreshold) / (nextRewardThreshold - previousThreshold), 1);

  return {
    ...state,
    dailyTask,
    toast,
    rewardProgress,
    nextRewardThreshold,
    completeDailyTask,
    swapDailyTask
  };
};

export type AppStateActions = ReturnType<typeof useAppState>;
