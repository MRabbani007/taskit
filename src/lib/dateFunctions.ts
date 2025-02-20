import {
  format,
  isToday,
  isTomorrow,
  isPast,
  differenceInDays,
} from "date-fns";

export function getDueDateStatement(dueDate: Date) {
  let message = "";
  let displayDate = "";
  let status = "";
  let isOverdue = false;
  let daysDifference = 0;

  if (isNaN(dueDate?.getSeconds())) {
    return { status, message, displayDate, isOverdue, daysDifference };
  }

  isOverdue = isPast(dueDate) && !isToday(dueDate);
  daysDifference = differenceInDays(dueDate, new Date());

  if (isToday(dueDate)) {
    message = `Due Today`;
    displayDate = format(dueDate, "PPP");
  } else if (isTomorrow(dueDate)) {
    message = `Due Tomorrow`;
    displayDate = format(dueDate, "PPP");
  } else if (daysDifference > 0 && daysDifference <= 7) {
    message = `Due in ${daysDifference} days`;
    displayDate = format(dueDate, "PPP");
  } else if (daysDifference > 7) {
    message = `Due on ${format(dueDate, "PPP")}`;
    displayDate = format(dueDate, "PPP");
  } else if (Math.abs(daysDifference) < 14) {
    message = `Overdue by ${Math.abs(daysDifference) + 1} days`;
    displayDate = format(dueDate, "PPP");
  } else {
    message = `Long Overdue (${Math.abs(daysDifference)} days)`;
    displayDate = format(dueDate, "PPP");
  }

  return { status, message, displayDate, isOverdue, daysDifference };
}

export function getDate(offset: number = 0) {
  const today = new Date(new Date().getTime() + offset * 24 * 60 * 60 * 1000);
  const year = today.getFullYear();

  const month = (today.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const monthStr = monthShort[today.getMonth()];

  const date = today.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const dateString = year + "-" + month + "-" + date;

  const day = weekdayLong[today.getDay()];

  return { date, day, month, monthStr, year, dateString };
}

const weekdayLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
