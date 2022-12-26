import { MouseEvent, KeyboardEvent } from 'react';
import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarWeek from 'components/Calendar/CalendarWeek';
import CalendarDates from 'components/Calendar/CalendarDates';
import styled from 'styled-components';
import { TDateObj } from 'constants/calendar';

interface CalendarProps {
  type: string;
  lang: string;
  dateObj: TDateObj;
  strLeng: number;
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  onClickHeaderBtn: (date: Date) => void;
  scheduleList?: string[];
}

const Calendar = ({ dateObj, type, lang, strLeng, scheduleList, onClickDate, onClickHeaderBtn }: CalendarProps) => {
  const year: number = new Date(dateObj.selectedDate).getFullYear();
  const month: number = new Date(dateObj.selectedDate).getMonth();

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

  return (
    <CalendarWrapper className={`calendar ${type}`}>
      <CalendarHeader date={dateObj.selectedDate} type={type} onClickHeaderBtn={onClickHeaderBtn} />
      <WeekDatesWrapper className={`calendar__week__dates ${type}`}>
        <CalendarWeek type={type} lang={lang} strLeng={strLeng} />
        <CalendarDates type={type} dateObj={dateObj} dates={dates} onClickDate={onClickDate} />
        {/* {scheduleList && scheduleList.length > 0 && (
          <TimeTable month={month} dates={dates} scheduleList={scheduleList} />
        )} */}
      </WeekDatesWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  &.large {
    min-width: 600px;
    border: 1px solid ${({ theme }) => theme.color_gray_30};
    border-radius: 15px;
    box-shadow: ${({ theme }) => theme.box_shadow_gray_1};
  }
`;

const WeekDatesWrapper = styled.div`
  position: relative;

  &.small {
    padding: 30px 10px 10px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color_gray_10};
  }
`;
