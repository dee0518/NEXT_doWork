export type TDateObj = {
  today: Date;
  selectedDate: Date;
  fromDate?: Date | null;
  toDate?: Date | null;
  [key: string]: Date | null;
};

export type TDateClass = 'other' | 'today' | 'from' | 'to' | 'term' | '';

export type TYearMonthDate = {
  year: number;
  month: number;
  date: number;
};
