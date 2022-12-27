export type TDateObj = {
  today: Date;
  selectedDate: Date;
  fromDate?: Date;
  toDate?: Date;
};

export type TDateClass = 'other' | 'today' | 'from' | 'to' | 'term' | '';
