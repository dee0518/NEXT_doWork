import { MouseEvent, KeyboardEvent } from 'react';
import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarWeek from 'components/Calendar/CalendarWeek';
import CalendarDates from 'components/Calendar/CalendarDates';
import styled from 'styled-components';
import { TDateObj } from 'types/calendar';

type TProps = {
  type: string;
  lang: string;
  dates: number[];
  dateObj: TDateObj;
  strLeng: number;
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  onClickHeaderBtn: (date: Date) => void;
  scheduleList?: string[];
};

const Calendar = ({ dateObj, dates, type, lang, strLeng, scheduleList, onClickDate, onClickHeaderBtn }: TProps) => (
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
