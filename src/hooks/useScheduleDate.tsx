import { KeyboardEvent, MouseEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';

const useScheduleDate = () => {
  const { selectedDate } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();
  const dateObj = {
    today: new Date(),
    selectedDate: new Date(selectedDate),
  };

  const onClickDate = (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') return;
    dispatch(scheduleActions.setSelectedDate(date));
  };

  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setSelectedDate(date));
  };

  return {
    dateObj,
    onClickDate,
    onClickHeaderBtn,
  };
};

export default useScheduleDate;
