import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iScheduleInfo, TFilter, filterItem, scheduleType, TFilterCount } from 'types/schedule';
import getDates from 'utils/getDates';

const initialState: scheduleType = {
  selectedMonthDates: [],
  stringSelectedDate: '',
  statusFilter: [
    { id: 'all', name: 'all', count: 0, color: 'purple', checked: true },
    { id: 'todo', name: 'to do', count: 0, color: 'pink', checked: true },
    { id: 'private', name: 'private', count: 0, color: 'orange', checked: true },
    { id: 'important', name: 'important', count: 0, color: 'skyblue', checked: true },
    { id: 'meeting', name: 'meeting', count: 0, color: 'green', checked: true },
  ],
  scheduleDetail: null,
  scheduleList: [],
  isShowEditedModal: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setStringSelectedDate: (state, action: PayloadAction<string>) => {
      const dates = getDates(new Date(action.payload));

      state.selectedMonthDates = dates;
      state.stringSelectedDate = action.payload;
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
    setScheduleDetail: (state, action: PayloadAction<string | null>) => {
      state.scheduleDetail = action.payload
        ? (state.scheduleList.find(({ _id }: iScheduleInfo) => _id === action.payload) as iScheduleInfo)
        : null;
    },
    setScheduleList: (state, action: PayloadAction<iScheduleInfo[]>) => {
      let filterCount: TFilterCount = { all: 0, todo: 0, private: 0, important: 0, meeting: 0 };
      action.payload.forEach(({ status }) => {
        filterCount = { ...filterCount, [status]: filterCount[status] + 1 };
      });

      state.statusFilter = state.statusFilter.map(status => ({
        ...status,
        count: filterCount[(status as filterItem).id],
      }));

      state.scheduleList = action.payload;
    },
    setIsShowEditedModal: (state, action: PayloadAction<boolean>) => {
      state.isShowEditedModal = action.payload;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;
