import { iUserInfo } from 'types/auth';

export interface iScheduleInfo {
  _id: string;
  user: iUserInfo;
  status: string;
  title: string;
  fromDate: number;
  fromTime: string;
  toDate: number;
  toTime: string;
  collaborators: iUserInfo[];
  content: string;
}

export type TCreatedScheduleInfo = Omit<iScheduleInfo, 'id'>;

export type TEditedScheduleInfo = Omit<iScheduleInfo, 'id' | 'user' | 'fromDate' | 'toDate'>;

export type filterItem = {
  id: string;
  name: string;
  count: number;
  color: string;
  checked: boolean;
};

export type TFilter = 'all' | 'todo' | 'private' | 'important' | 'meeting';

export type scheduleType = {
  selectedMonthDates: number[];
  stringSelectedDate: string;
  statusFilter: filterItem[];
  scheduleDetail: iScheduleInfo | null;
  scheduleList: iScheduleInfo[];
  isShowEditedModal: boolean;
};

export type statusItem = Omit<filterItem, 'count' | 'color' | 'checked'>;

export type TUserResultError = Pick<iUserInfo, 'id' | 'name' | 'email'>;

export type TFilterCount = {
  [index: string]: number;
  all: number;
  todo: number;
  private: number;
  important: number;
  meeting: number;
};

export type TTimeLine = {
  _id: string;
  type: string;
  title: string;
  top: number;
  start: number;
  end: number;
};
