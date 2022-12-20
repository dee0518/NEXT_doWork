import { KeyboardEvent, MouseEvent } from 'react';
import { scheduleAction } from 'redux/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';

const useScheduleDate = () => {
  const today = new Date();
  const { selectedDate } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();

  const onClickDate = (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') return;
    dispatch(scheduleAction.setSelectedDate(date));
  };

  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleAction.setSelectedDate(date));
  };

  return {
    today,
    selectedDate,
    onClickDate,
    onClickHeaderBtn,
  };
};

export default useScheduleDate;
