import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iScheduleInfo, TFilter, filterItem, scheduleType } from 'types/schedule';

const initialState: scheduleType = {
  selectedMonthDates: [],
  selectedDate: '',
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

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      const year: number = new Date(action.payload).getFullYear();
      const month: number = new Date(action.payload).getMonth();

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

      state.selectedMonthDates = dates;
      state.selectedDate = action.payload;
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
      state.scheduleDetail = state.scheduleList.find(({ id }) => id === action.payload) as iScheduleInfo;
    },
    setScheduleList: (state, action: PayloadAction<iScheduleInfo[]>) => {
      let filterCount = { all: 0, todo: 0, private: 0, important: 0, meeting: 0 };
      action.payload.forEach(({ status }) => {
        filterCount = { ...filterCount, [status]: filterCount[status] + 1 };
      });

      state.statusFilter = state.statusFilter.map(status => ({
        ...status,
        count: filterCount[(status as filterItem).id],
      }));

      state.scheduleList = action.payload;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;
