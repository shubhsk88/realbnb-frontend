import isWithinInterval from "date-fns/isWithinInterval";

export const checkDisableDate = (
  date: Date,
  dateRanges: { start: Date; end: Date }[]
): boolean => {
  return dateRanges.some((val) => isWithinInterval(date, val));
};

export const dateRanges = [
  {
    start: new Date(2021, 2, 12),
    end: new Date(2021, 5, 12),
  },
  {
    start: new Date(2021, 2, 19),
    end: new Date(2021, 2, 23),
  },
];
