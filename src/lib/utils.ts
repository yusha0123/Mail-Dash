import { clsx, type ClassValue } from "clsx";
import { format, isSameYear } from "date-fns";
import { twMerge } from "tailwind-merge";
import { FirebaseTimestamp } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type formatDateInput = {
  date: FirebaseTimestamp | Date;
};

export function formatDate({ date }: formatDateInput, showFullDate = false) {
  const currentDate = new Date();
  const inputDate = date instanceof Date ? date : new Date(date.seconds * 1000);

  if (showFullDate) {
    return format(inputDate, "dd MMM yyyy 'at' h:mm a");
  }

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
