export const todayKey = () => new Date().toISOString().slice(0, 10);

export const monthDays = (year: number, monthIndex: number) => {
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const mondayOffset = firstWeekday === 0 ? 6 : firstWeekday - 1;
  return {
    leadingEmpty: Array.from({ length: mondayOffset }, (_, index) => `empty-${index}`),
    days: Array.from({ length: days }, (_, index) => index + 1)
  };
};

export const toDateKey = (year: number, monthIndex: number, day: number) =>
  `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
