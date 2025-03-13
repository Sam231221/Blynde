import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
export const getLocalStorageItem = <T>(key: string, fallback: T): T => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  }
  return fallback;
};
export const calculateRemainingTime = (endDate: Date, now: Date) => {
  const diffInDays = differenceInDays(endDate, now);
  const diffInHours = differenceInHours(endDate, now) % 24;
  const diffInMinutes = differenceInMinutes(endDate, now) % 60;
  const diffInSeconds = differenceInSeconds(endDate, now) % 60;

  return {
    remainingDays: diffInDays,
    remainingHours: diffInHours,
    remainingMinutes: diffInMinutes,
    remainingSeconds: diffInSeconds,
  };
};
