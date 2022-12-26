import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScheduleInfo, TFilter, filterItem, scheduleType } from 'types/schedule';

const initialState: scheduleType = {
  selectedDate: new Date().toString(),
  statusFilter: [
    { id: 'all', name: 'all', count: 0, color: 'purple', checked: true },
    { id: 'todo', name: 'to do', count: 0, color: 'pink', checked: true },
    { id: 'private', name: 'private', count: 0, color: 'orange', checked: true },
    { id: 'important', name: 'important', count: 0, color: 'skyblue', checked: true },
    { id: 'meeting', name: 'meeting', count: 0, color: 'green', checked: true },
  ],
  scheduleDetail: null,
  scheduleList: [],
};

const schedule = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload.toString();
    },
    setFilter: (state, action: PayloadAction<TFilter>) => {
      const { id, checked } = state.statusFilter.find(status => status.id === action.payload) as filterItem;

      state.statusFilter = state.statusFilter.map(status => {
        if (id === 'all') {
          return { ...status, checked: !checked };
        }
        if (checked) {
          return status.id === 'all' || status.id === id ? { ...status, checked: false } : status;
        }

        const rest = state.statusFilter.filter(({ id, checked }) => id !== 'all' && checked).length;

        if (rest === 3) {
          return { ...status, checked: true };
        }
        return status.id === id ? { ...status, checked: true } : status;
      });
    },
    setScheduleDetail: (state, action: PayloadAction<string>) => {
      state.scheduleDetail = state.scheduleList.find(({ id }) => id === action.payload) as ScheduleInfo;
    },
    setScheduleList: (state, action: PayloadAction<ScheduleInfo[]>) => {
      state.scheduleList = action.payload;
    },
  },
});

export const scheduleActions = schedule.actions;
export default schedule;
