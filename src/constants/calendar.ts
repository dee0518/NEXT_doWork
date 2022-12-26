export type TDateObj = {
  today: Date;
  selectedDate: string;
  fromDate?: Date;
  toDate?: Date;
};

export type TDateClass = 'other' | 'today' | 'from' | 'to' | 'term' | '';
