export interface ScheduleInfo {
  id: string;
  user: string;
  status: string;
  title: string;
  fromAt: string;
  fromTime: string;
  toAt: string;
  toTime: string;
  collaborators: string[];
  content: string;
}

export type filterItem = {
  id: string;
  name: string;
  count: number;
  color: string;
  checked: boolean;
};

export type TFilter = 'all' | 'todo' | 'private' | 'important' | 'meeting';

export type scheduleType = {
  selectedDate: string;
  statusFilter: filterItem[];
  scheduleDetail: ScheduleInfo | null;
  scheduleList: ScheduleInfo[];
};

export type statusItem = Omit<filterItem, 'count' | 'color'>;
