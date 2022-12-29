import { KeyboardEvent, useEffect, MouseEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import getFirstLastDate from 'utils/getFirstLastDate';
import { getScheduleByStartEnd } from 'lib/schedule';

const useScheduleDate = (type: string) => {
  const { stringSelectedDate, selectedMonthDates: dates } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();
  const dateObj = {
    today: new Date(),
    selectedDate: new Date(stringSelectedDate),
  };

  useEffect(() => {
    if (type !== 'timeline') return;
    getSchedule(dateObj.selectedDate, dates);
  }, [stringSelectedDate]);

  const getSchedule = async (date: Date, dates: number[]) => {
    const { firstDate, lastDate } = getFirstLastDate(date, dates);

    const startAt = firstDate.getTime();
    const endAt = lastDate.getTime();

    try {
      const response = await getScheduleByStartEnd({ startAt, endAt });
      if (response && response.result) dispatch(scheduleActions.setScheduleList(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDate = (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') return;
    dispatch(scheduleActions.setIsShowEditedModal(true));
    dispatch(scheduleActions.setStringSelectedDate(date.toString()));
  };

  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setStringSelectedDate(date.toString()));
  };

  return {
    dateObj,
    dates,
    onClickDate,
    onClickHeaderBtn,
  };
};

export default useScheduleDate;
