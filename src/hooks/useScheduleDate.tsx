import { KeyboardEvent, MouseEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';

const useScheduleDate = () => {
  const today = new Date();
  const { selectedDate } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();

  const onClickDate = (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    if (e.type === 'keyup' && (e as KeyboardEvent).key !== 'Enter') return;
    dispatch(scheduleActions.setSelectedDate(date));
  };

  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setSelectedDate(date));
  };

  return {
    today,
    selectedDate,
    onClickDate,
    onClickHeaderBtn,
  };
};

export default useScheduleDate;
