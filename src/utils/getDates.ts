const getDates = (date: Date) => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();

  const lastDateOnPrevMonth: number = new Date(year, month, 0).getDate();
  const lastDateOnCurMonth: number = new Date(year, month + 1, 0).getDate();
  const theDayOfTheWeekOn1st: number = new Date(year, month, 1).getDay();
  const theDayOfTheWeekOnLast: number = new Date(year, month, lastDateOnCurMonth).getDay();

  const theRestOfDatesOnPrevMonth: number[] = new Array(theDayOfTheWeekOn1st)
    .fill(1)
    .map((_, i, self) => lastDateOnPrevMonth - self.length + i + 1);
  const theDatesOnCurMonth: number[] = new Array(lastDateOnCurMonth).fill(1).map((_, i) => i + 1);
  const theRestOfDatesOnNextMonth: number[] = new Array(6 - theDayOfTheWeekOnLast).fill(1).map((_, i) => i + 1);
  const dates: number[] = [...theRestOfDatesOnPrevMonth, ...theDatesOnCurMonth, ...theRestOfDatesOnNextMonth];

  return dates;
};

export default getDates;
