import { clsx, type ClassValue } from "clsx";
import { format, isSameYear } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type formatDate = {
  date: {
    seconds: number;
    nanoseconds: number;
  };
};
export function formatDate({ date }: formatDate) {
  const currentDate = new Date();
  const inputDate = new Date(date.seconds * 1000);

  const diffInSeconds =
    Math.abs(currentDate.getTime() - inputDate.getTime()) / 1000;
  const secondsInDay = 24 * 60 * 60;

  if (diffInSeconds < 60) {
    return "now";
  } else if (diffInSeconds < secondsInDay) {
    return format(inputDate, "hh:mm a");
  } else if (isSameYear(inputDate, currentDate)) {
    return format(inputDate, "MMM dd");
  } else {
    return format(inputDate, "MMM dd yyyy");
  }
}

export const createMarkup = (htmlString: string) => {
  return { __html: htmlString };
};
