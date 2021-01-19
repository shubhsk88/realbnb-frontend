import isWithinInterval from "date-fns/isWithinInterval";

export const checkDisableDate = (
  date: Date,
  dateRanges: { start: Date; end: Date }[]
): boolean => {
  return dateRanges.some((val) => isWithinInterval(date, val));
};

export const dateRanges = [
  { start: new Date("02-12-2021"), end: new Date("02-15-2021") },
  { start: new Date("02-19-2021"), end: new Date("02-23-2021") },
];
