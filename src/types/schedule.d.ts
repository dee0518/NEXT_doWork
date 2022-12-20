export type filterItem = {
  id: string;
  name: string;
  count: number;
  color: string;
  checked: boolean;
};

export type TFilter = 'all' | 'todo' | 'private' | 'important' | 'meeting';

export type scheduleType = {
  selectedDate: Date;
  statusFilter: filterItem[];
};
