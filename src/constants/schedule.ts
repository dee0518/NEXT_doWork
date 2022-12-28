import { TEditedScheduleInfo, statusItem } from 'types/schedule';

export const statusList: statusItem[] = [
  {
    id: 'todo',
    name: 'to do',
  },
  {
    id: 'private',
    name: 'private',
  },
  {
    id: 'important',
    name: 'important',
  },
  {
    id: 'meeting',
    name: 'meeting',
  },
];

export const timeList: string[] = [
  '00: 00',
  '01: 00',
  '02: 00',
  '03: 00',
  '04: 00',
  '05: 00',
  '06: 00',
  '07: 00',
  '08: 00',
  '09: 00',
  '10: 00',
  '11: 00',
  '12: 00',
  '13: 00',
  '14: 00',
  '15: 00',
  '16: 00',
  '17: 00',
  '18: 00',
  '19: 00',
  '20: 00',
  '21: 00',
  '22: 00',
  '23: 00',
];

export const initialSchedule: TEditedScheduleInfo = {
  title: '',
  status: 'todo',
  fromTime: '00:00',
  toTime: '00:00',
  collaborators: [],
  content: '',
};
