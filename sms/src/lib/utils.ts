import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MonthNames } from "./data";
import { MonthlyAttendance, TAttendence } from "./utils/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAttendencCalendar(
  attendence: TAttendence[]
): MonthlyAttendance[] {
  let calendar: MonthlyAttendance[] = [];
  const date = new Date();

  const getPresent = (
    attendence: any[],
    day: number,
    month: number
  ): boolean => {
    const res = attendence.find(
      (d) => d.date.getDate() === day && d.date.getMonth() == month
    );

    if (res) {
      return true;
    }
    return false;
  };

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    let monthData: any = { Month: MonthNames[month] };
    for (let day = 1; day <= daysInMonth; day++) {
      const isPresent = getPresent(attendence, day, month);
      const dayObj = { [day]: isPresent };
      monthData = { ...monthData, ...dayObj };
    }
    calendar.push(monthData);
  }
  return calendar;
}
