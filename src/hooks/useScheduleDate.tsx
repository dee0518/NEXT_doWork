import { KeyboardEvent, useEffect, MouseEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import getFirstLastDate from 'utils/getFirstLastDate';

const useScheduleDate = (type: string) => {
  const { selectedDate, selectedMonthDates: dates } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();
  const dateObj = {
    today: new Date(),
    selectedDate: new Date(selectedDate),
  };

  useEffect(() => {
    if (type !== 'timeline') return;
    getSchedule(dateObj.selectedDate, dates);
  }, [selectedDate]);

  const getSchedule = async (date: Date, dates: number[]) => {
    const { firstDate, lastDate } = getFirstLastDate(date, dates);

    const startAt = firstDate.getTime();
    const endAt = lastDate.getTime();

    const response = await fetch(`api/schedule?startAt=${startAt}&endAt=${endAt}`);
    const json = await response.json();

    if (json && json.result) dispatch(scheduleActions.setScheduleList(json.data));
  };

  const onClickDate = (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') return;
    dispatch(scheduleActions.setSelectedDate(date.toString()));
  };

  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setSelectedDate(date.toString()));
  };

  return {
    dateObj,
    dates,
    onClickDate,
    onClickHeaderBtn,
  };
};

export default useScheduleDate;
