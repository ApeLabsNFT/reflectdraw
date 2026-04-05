import { format } from "date-fns";
import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDayMonth(date: string) {
  return format(new Date(date), "MMM d");
}

export function formatFullDate(date: string) {
  return format(new Date(date), "MMMM d, yyyy");
}

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((segment) => segment[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
